const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const { join } = require("node:path");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: colors.emerald,
      zinc: colors.zinc,
      white: colors.white,
      slate: colors.slate,
    },
    extend: {
      borderWidth: {
        1: "1px",
      },
    },
  },
};
