const colors = require("@radix-ui/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  darkMode: "class",
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    colors: radixToTailwindConfig(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    extend: { fontFamily: { inter: ["Inter", ...fontFamily.sans] } },
  },
};

/**
 * @param {string} step
 * @param {string} color
 */
function getStep(step, color) {
  return step.replace(new RegExp(`${color}a?`, "i"), "");
}

function radixToTailwindConfig() {
  const initial = {
    white: "white",
    black: "black",
    current: "currentColor",
    transparent: "transparent",
  };

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
