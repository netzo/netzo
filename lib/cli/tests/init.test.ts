import { join } from "std/path/mod.ts";
import { assert, assertStringIncludes } from "std/assert/mod.ts";
import { retry } from "std/async/retry.ts";
import $, { CommandBuilder } from "https://deno.land/x/dax@0.39.1/mod.ts";

Deno.test("CLI init and task execution -- minimal", async (t) => {
  const tmpDirName = await Deno.makeTempDir();

  await t.step("init project", async () => {
    await executeAndAssert(
      $`deno run -A ./lib/cli/netzo.ts init minimal --dir ${tmpDirName}`,
    );
  });

  await t.step("format", async () => {
    await executeAndAssert($`deno fmt --check`.cwd(tmpDirName));
  });

  await t.step("lint", async () => {
    await executeAndAssert($`deno lint`.cwd(tmpDirName));
  });

  // TODO: fix type check https://github.com/netzo/netzo/issues/88
  // await t.step("type check", async () => {
  //   await executeAndAssert($`deno task check:types`.cwd(tmpDirName));
  // });

  await t.step("test", async () => {
    await executeAndAssert($`deno task test --no-check`.cwd(tmpDirName));
  });

  await t.step("cleanup", async () => {
    await retry(() => Deno.remove(tmpDirName, { recursive: true }));
  });
});

Deno.test("CLI init and task execution -- crm", async (t) => {
  const tmpDirName = await Deno.makeTempDir();

  await t.step("init project", async () => {
    await executeAndAssert(
      $`deno run -A ./lib/cli/netzo.ts init crm --dir ${tmpDirName}`,
    );
  });

  await t.step("format", async () => {
    await executeAndAssert($`deno fmt --check`.cwd(tmpDirName));
  });

  await t.step("lint", async () => {
    await executeAndAssert($`deno lint`.cwd(tmpDirName));
  });

  // TODO: fix type check https://github.com/netzo/netzo/issues/88
  // await t.step("type check", async () => {
  //   await executeAndAssert($`deno task check:types`.cwd(tmpDirName));
  // });

  await t.step("test", async () => {
    await executeAndAssert($`deno task test --no-check`.cwd(tmpDirName));
  });

  await t.step("cleanup", async () => {
    await retry(() => Deno.remove(tmpDirName, { recursive: true }));
  });
});

Deno.test("CLI init reflects changes in the template -- minimal", async () => {
  const tmpDirName = await Deno.makeTempDir();
  const templateDir = join(Deno.cwd(), "./templates/minimal");
  const newRoutePath = join(templateDir, "routes/foo.tsx");
  const newRouteContent = `export default function Home() {
  return <div>foo</div>;
}
`;

  try {
    await Deno.writeTextFile(newRoutePath, newRouteContent);

    await executeAndAssert(
      $`deno run -A ./lib/cli/netzo.ts init minimal --dir ${tmpDirName}`,
    );

    const newProjectRoutePath = join(tmpDirName, "routes/foo.tsx");
    const newProjectRouteContent = await Deno.readTextFile(newProjectRoutePath);
    assertStringIncludes(newProjectRouteContent, "foo");

    const manifestOutput = await executeAndAssert(
      $`deno task manifest`.cwd(tmpDirName),
    );
    assertStringIncludes(
      manifestOutput.combined,
      "The manifest has been generated for 2 routes and 0 islands.",
    );
  } finally {
    await Deno.remove(newRoutePath).catch(() => {});
    await retry(() => Deno.remove(tmpDirName, { recursive: true }));
  }
});

async function executeAndAssert(commandBuilder: CommandBuilder) {
  const result = await commandBuilder.stdout("piped").stderr("piped")
    .captureCombined().noThrow();
  assert(
    result.code === 0,
    `Command failed with code ${result.code} and output:
${result.combined}`,
  );
  return result;
}
