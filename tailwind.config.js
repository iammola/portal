/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const colors = require("@radix-ui/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

function radixToTailwindConfig() {
  const initial = {
    white: "white",
    black: "black",
    current: "currentColor",
    transparent: "transparent",
  };

  const getStep = (step, color) => String(step).replace(new RegExp(`${String(color)}a?`, "i"), "");

  return Object.entries(colors).reduce((acc, [color, colorSteps]) => {
    const arr = color.split(/(?=[A-Z])/);
    const steps = Object.entries(colorSteps).reduce(
      (acc, [step, value]) => ({
        ...acc,
        [getStep(step, arr[0])]: value,
      }),
      {}
    );

    return {
      ...acc,
      [arr.join("-").toLowerCase()]: steps,
    };
  }, initial);
}

/** @type {import("tailwindcss").Config } */
const config = {
  darkMode: "class",
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    colors: radixToTailwindConfig(),
    screens: { xs: "475px", ...defaultTheme.screens },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};

module.exports = config;
