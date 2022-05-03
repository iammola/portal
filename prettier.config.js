/** @type {import("prettier").Config } */
module.exports = {
  printWidth: 120,
  singleAttributePerLine: true,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
