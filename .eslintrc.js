module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:prettier/recommended'],
  // extends: ['plugin:prettier/recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended']
  // Normally, we would use the above line, but we are using just prettier for now. We will add the other plugins later.
  ignorePatterns: ['lint-staged.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    project: './tsconfig.json'
  }
};
