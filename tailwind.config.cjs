const { nextui } = require("@nextui-org/react");

import {
  scopedPreflightStyles,
  isolateInsideOfContainer, // there are also isolateOutsideOfContainer and isolateForComponents
} from 'tailwindcss-scoped-preflight';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Add your component paths here
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    // scopedPreflightStyles({
    //   isolationStrategy: isolateInsideOfContainer([".tableTemplate", "#tw-id"]),
    // }),
    nextui()
  ],
};