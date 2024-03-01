import { defineConfig } from "unocss";

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
});
