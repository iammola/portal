import type { OptionsType } from "@zxcvbn-ts/core/dist/types";

/**
 * It loads the options for the password checker, and if they've already been loaded, it returns them
 * @returns the options for the zxcvbn library.
 */
async function loadOptions() {
  if (global.checkPasswordOptions) return global.checkPasswordOptions;

  const english = await import("@zxcvbn-ts/language-en");
  const common = await import("@zxcvbn-ts/language-common");

  global.checkPasswordOptions = {
    translations: english.default.translations,
    graphs: common.default.adjacencyGraphs,
    dictionary: {
      ...common.default.dictionary,
      ...english.default.dictionary,
    },
  };

  return global.checkPasswordOptions;
}

/**
 * It loads the zxcvbn-ts library and its options, and returns a function that can be used to check the
 * strength of a password
 * @returns A function that takes a password and returns a result.
 */
export async function checkPasswordStrength() {
  const { zxcvbn, zxcvbnOptions } = await import("@zxcvbn-ts/core");

  zxcvbnOptions.setOptions(await loadOptions());
  return (password: string) => zxcvbn(password);
}

declare const global: { checkPasswordOptions: OptionsType };
