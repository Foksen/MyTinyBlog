import {
  palettes,
  rounded,
  components,
  animations,
  visualizations,
} from "@tailus/themer";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tailus/themer/dist/components/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: palettes.trust,
      // colors: ({ colors }) => ({
      //   ...palettes.romance,
      //   primary: colors.indigo,
      //   secondary: colors.blue,
      //   accent: colors.lime,
      // }),
    },
  },
  plugins: [components, rounded, animations, visualizations],
};
