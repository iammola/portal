const {
    fontFamily: { sans },
} = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
    content: ["pages/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    theme: { extend: { fontFamily: { poppins: ["Poppins", ...sans], inter: ["Inter", ...sans] } } },
    variants: {},
    plugins: [],
};
