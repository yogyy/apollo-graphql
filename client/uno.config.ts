import { defineConfig, presetAttributify } from "unocss";
import transformerCompileClass from "@unocss/transformer-compile-class";
import transformerAttributifyJsx from "@unocss/transformer-attributify-jsx";

export default defineConfig({
  theme: {
    colors: {
      text: "hsl(var(--text))",
      background: "hsl(var(--background))",
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      accent: "hsl(var(--accent))",
    },
  },
  transformers: [
    transformerAttributifyJsx(),
    transformerCompileClass({ classPrefix: "ygy-" }),
  ],
});
