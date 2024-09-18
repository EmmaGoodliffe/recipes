import tw from "tailwindcss/colors";
import type { Config } from "tailwindcss";

// const palette = {
//   ketchup: {
//     0: "#FEAFB0",
//     1: "#DD0307",
//     2: "#790204",
//     3: "#640203",
//   },
//   mustard: {
//     0: "#FDE8B0",
//     1: "#FDBD0D",
//     2: "#B68602",
//     3: "#8D6801",
//     white: "#FFF4D7",
//   },
//   asparagus: {
//     0: "#B1E067",
//     1: "#66921E",
//     2: "#23330A",
//     3: "#182207",
//     grey: {
//       0: "#515749",
//       1: "#3B4033",
//       2: "#25281F",
//     },
//     black: "#0C1103",
//   },
// };

// const mine = {
//   bg: palette.asparagus.grey[2],
//   "light-bg": palette.asparagus.grey[1],
//   "dark-bg": palette.asparagus.black,
//   text: palette.mustard.white,
//   "dark-text": palette.asparagus[2],
//   border: palette.asparagus.grey[0],
//   input: palette.asparagus.grey[0],
//   scroller: palette.asparagus[0],
//   file: palette.asparagus[1],
//   cook: palette.asparagus[0],
//   shop: palette.mustard[1],
//   "light-danger": palette.ketchup[0],
//   danger: palette.ketchup[1],
//   matches: {
//     0: palette.asparagus[0],
//     1: palette.asparagus[1],
//     2: palette.mustard[0],
//     3: palette.mustard[1],
//     4: palette.ketchup[0],
//   },
// };

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        bg: tw.neutral[800],
        "light-bg": tw.neutral[700],
        "dark-bg": tw.neutral[900],
        text: tw.green[50],
        "dark-text": tw.neutral[800],
        border: tw.neutral[500],
        input: tw.neutral[500],
        scroller: tw.green[200],
        file: tw.fuchsia[500],
        cook: tw.green[500],
        shop: tw.yellow[500],
        "light-danger": tw.red[300],
        danger: tw.red[500],
        matches: {
          0: tw.green[300],
          1: tw.yellow[300],
          2: tw.red[300],
          3: tw.fuchsia[300],
          4: tw.sky[300],
          5: tw.orange[300],
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
} as Config;
