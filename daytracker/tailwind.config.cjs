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
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: colors.emerald,
    },
  },
};
