import type { App } from "fresh";
import { UnoGenerator } from "../../deps/@unocss/core.ts";
// IMPORTANT: import from directly from vendored @std/ to avoid Deno leaking to client
import { existsSync } from "../../deps/@std/fs/exists.ts";
import { join } from "../../deps/@std/path.ts";
import { minify } from "../../deps/csso.ts";
import type { NetzoState } from "../../mod.ts";
import type { UnocssConfig } from "./types.ts";
import { cssReset, runOverDirectory } from "./utils.ts";

export * from "./types.ts";

/**
 * Plugin to automatically generates CSS utility classes
 *
 * IMPORTANT: must declare a valid UnoCSS configuration file and pass it as the "config" option.
 *
 * @exampe Add the following scripts and styles to the _app.tsx file:
 * <link rel="stylesheet" href="https://esm.sh/@unocss/reset@0.56.5/tailwind-compat.css" />
 * <script type="module" src="https://deno.land/x/netzo/plugins/unocss/runtime.js" />
 * <link rel="stylesheet" href="/uno.css" />
 */
export const unocss = async (
  app: App<NetzoState>,
  {
    url = `${Deno.cwd()}/uno.config.ts`,
    aot = true,
    // IMPORTANT: csr mode is disabled by default since it significantly slows down hydration
    // due primarily to the presetUno() being used by presetNetzo(), which slows down the initUnocssRuntime()
    // function from ~500ms to ~30s. To work around this, the presetShadcn() already safe-lists all dynamically
    // injected classes (e.g. those from dialogs which are mounted dynamically), and additional ones can be
    // specified in "safelist" of uno.config. (see https://github.com/netzo/netzo/issues/172)
    csr = false,
    ...config
  }: UnocssConfig,
) => {
  // NOTE: Subhosting somehow fails when operating with and/or importing from
  // file:// URLs, so we remove the file:// prefix to avoid build/deployment errors
  const configURL = url.replace("file://", "");

  console.log({configURL})

  // Serialize UnoCSS config contents to base64 ES import since default fresh serialization
  // (via esbuild) looses functions when bundling the client runtime script for CSR mode.
  const configFileExists = existsSync(configURL, { isFile: true, isReadable: true });
  if (csr && !configFileExists) {
    throw new Error(`Missing UnoCSS configuration file in the project directory.`);
  }
  if (aot && !config) {
    throw new Error(`Missing UnoCSS configuration file in the project directory.`);
  }

  if (csr) {
    app.get("/unocss/runtime.js", (_ctx) => {
      return new Response(`/* unocss runtime */
import config from "data:application/javascript;base64,${btoa(Deno.readTextFileSync(configURL))}";
import initUnocssRuntime from "https://esm.sh/@unocss/runtime@0.59.0";

const SKIP = ["@unocss/preset-uno", "@unocss/preset-icons"];
config.presets?.forEach((p, i) => {
  if (SKIP.includes(p.name)) delete config.presets[i];
  config.presets?.[i]?.presets?.forEach((p, j) => {
    if (SKIP.includes(p.name)) delete config.presets[i].presets[j];
  });
});

export default function() {
  globalThis.__unocss = config;
  console.time("[unocss] initUnocssRuntime");
  setTimeout(() => initUnocssRuntime(), 0);
  console.timeEnd("[unocss] initUnocssRuntime");
}
`,
   {
        headers: {
          "content-type": "application/javascript",
          "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
        },
      });
    });
  }

  // Create the generator object
  const uno = new UnoGenerator(config);

  // Extract classes from source code and generate CSS
  console.time(`[unocss] generate cssFromSrc`)
  const cssFromSrc = await runOverDirectory(uno, Deno.mainModule);
  console.timeEnd(`[unocss] generate cssFromSrc`)

  console.time(`[unocss] generate cssFromLib`)
  const cssFromLib = await runOverDirectory(uno, new URL("../../components", import.meta.url).href);
  console.timeEnd(`[unocss] generate cssFromLib`)

  const css = `/* reset */
${cssReset}
/* netzo/components */
${cssFromLib}
/* src */
${cssFromSrc}
`;

  // Minify the generated CSS
  console.time(`[unocss] minify`)
  const { css: cssMinified } = minify(css);
  console.timeEnd(`[unocss] minify`)

  console.log({ css: css.length, cssMinified: cssMinified.length });

  // FIXME: app.config.mode === "production" (not "development") when running `deno task dev`
  const WORKAROUND_MODE = "production"; // "development";
  if (aot && app.config.mode === WORKAROUND_MODE) {
    console.log("WORKAROUND_MODE", app.config.mode);
    // Add a middleware to handle requests for the generated CSS file with no-cache
    // FIXME: this custom route is not working somehow
    console.time(`[unocss] add /uno.css route`)
    app.get("/uno.css", (_ctx) => {
      return new Response(cssMinified, {
        headers: {
          "content-type": "text/css",
          "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
        },
      });
    });
    console.timeEnd(`[unocss] add /uno.css route`)

    // WORKAROUND: Write the generated CSS to a static file
    console.time(`[unocss] generate static/uno.css`)
    const { staticDir } = app?.config ?? {};
    await Deno.writeTextFile(join(staticDir, "uno.css"), cssMinified);
    console.timeEnd(`[unocss] generate static/uno.css`)
  }

  if (aot && Deno.args.includes("build")) {
    // Write the generated CSS to a static file
    console.time(`[unocss] generate _fresh/static/uno.css`)
    const { outDir } = app?.config?.build ?? {};
    await Deno.writeTextFile(join(outDir, "static", "uno.css"), cssMinified);
    console.timeEnd(`[unocss] generate _fresh/static/uno.css`)
  }
};