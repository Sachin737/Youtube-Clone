/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/**/*.js",
  "./src/**/*.jsx",
  "./src/**/*.ts",
  "./src/**/*.ts",
];
export const theme = {
  extend: {},
};
export const plugins = [
  require("@tailwindcss/line-clamp"),
  require("tailwind-scrollbar-hide"),
];
