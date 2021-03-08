module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:jest/recommended",
  ],
  plugins: [
    'react-hooks',
    '@typescript-eslint',
  ],
  env: {
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    indent: [2, 2, { SwitchCase: 1 }],
    'brace-style': 1,
    'no-trailing-spaces': 2,

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'jest/no-identical-title': 'error',
    'jest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
  },
  overrides: [
    {
      files: ['**/*.test.ts?(x)'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
