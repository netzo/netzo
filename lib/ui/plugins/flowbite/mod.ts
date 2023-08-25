import { Plugin } from "../deps.ts";

export type FlowbiteOptions = {
  additionalStylesheets?: string[];
  additionalScripts?: string[];
  plugins?: {
    datepicker?: boolean;
  };
};

export const flowbite = (options: FlowbiteOptions = {}): Plugin => {
  if (!options.additionalScripts) options.additionalScripts = [];
  if (!options.additionalStylesheets) options.additionalStylesheets = [];
  if (!options.plugins) options.plugins = { datepicker: true };

  if (options.plugins.datepicker) {
    options.additionalScripts.push(
      "https://unpkg.com/flowbite@1.6.3/dist/datepicker.js",
    );
  }

  return {
    name: "flowbite",
    entrypoints: { "main": import.meta.resolve("./main.ts") },
    render(ctx) {
      ctx.render();
      return {
        scripts: [
          {
            entrypoint: "main",
            state: options,
          },
        ],
      };
    },
  };
};