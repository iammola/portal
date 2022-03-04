const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["pages/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...(typeof fontFamily !== "function" ? fontFamily.sans : "")],
        poppins: ["Poppins", ...(typeof fontFamily !== "function" ? fontFamily.sans : "")],
      },
    },
  },
  variants: {},
  plugins: [],
};
