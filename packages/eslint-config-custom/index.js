module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
    'prettier',
    'react-hooks',
    'security',
    'simple-import-sort',
    'turbo'
  ],
  rules: {
    '@typescript-eslint/indent': 'off',
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'security/detect-object-injection': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'tsdoc/syntax': 'warn',
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};