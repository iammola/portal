/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["pages/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...fontFamily.sans],
        urbane: ["Urbane", ...fontFamily.sans],
        poppins: ["Poppins", ...fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
