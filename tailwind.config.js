const colors = require("@radix-ui/colors");

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  darkMode: "class",
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    colors: radixToTailwindConfig(),
    extend: {
      fontFamily: {
        inter: ["Inter"],
        urbane: ["Urbane"],
        poppins: ["Poppins"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
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
