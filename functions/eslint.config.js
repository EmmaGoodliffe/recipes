import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import imp from "eslint-plugin-import";
import globals from "globals";
import config from "../eslint.config";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: { globals: { ...globals.node } },
  },
  {
    plugins: { import: imp },
    rules: config.slice(-1)[0].rules,
  },
];
