import type { Config } from "tailwindcss";

const palette = {
  ketchup: {
    0: "#FEAFB0",
    1: "#DD0307",
    2: "#790204",
    3: "#640203",
  },
  mustard: {
    0: "#FDE8B0",
    1: "#FDBD0D",
    2: "#B68602",
    3: "#8D6801",
    white: "#FFF4D7",
  },
  asparagus: {
    0: "#B1E067",
    1: "#66921E",
    2: "#23330A",
    3: "#182207",
    grey: {
      0: "#515749",
      1: "#3B4033",
      2: "#25281F",
    },
    black: "#0C1103",
  },
};

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        bg: palette.asparagus.grey[2],
        "light-bg": palette.asparagus.grey[1],
        "dark-bg": palette.asparagus.black,
        text: palette.mustard.white,
        input: palette.asparagus.grey[0],
        button: palette.asparagus[1],
      },
      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [],
} as Config;
