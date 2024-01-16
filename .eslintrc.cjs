/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'google'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'require-jsdoc': 'off',
    'indent': ['error', 2, { SwitchCase: 1 }],
    'max-len': ['error', 120],
    'no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'valid-jsdoc': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
