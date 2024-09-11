const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const { join } = require("path");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
