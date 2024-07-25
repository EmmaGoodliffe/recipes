import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        o: colors.orange[400],
        y: colors.amber[300],
        k: colors.zinc[900],
        grey: colors.zinc[700],
        w: colors.zinc[100],
      },
    },
  },
  plugins: [],
} as Config;
