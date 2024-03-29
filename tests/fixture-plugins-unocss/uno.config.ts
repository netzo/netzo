import presetUno from "https://esm.sh/@unocss/preset-uno@0.55.1";
import { defineUnocssConfig } from "netzo/plugins/unocss/plugin.ts";

export default defineUnocssConfig({
  url: import.meta.url,
  presets: [presetUno()],
});
