module.exports = {
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
  ],
};
