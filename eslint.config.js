const prettierPlugin = require('eslint-plugin-prettier');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    ignores: ['node_modules', 'dist'], // Ignoring node_modules and dist folder
  },
  {
    files: ['**/*.ts', '**/*.js'], // Apply the config to all TS and JS files
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // General rules
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      // indent: ['error', 2],

      // Add TypeScript-specific rules here
      '@typescript-eslint/explicit-function-return-type': 'error', // Enforce return types
      '@typescript-eslint/no-unused-vars': 'error', // Disallow unused variables
      'prettier/prettier': 'error', // Integrates Prettier rules
      '@typescript-eslint/typedef': [
        'error', // Enforce typing for variables, functions, properties, and parameters
        {
          parameter: true, // Enforce types on function parameters
          propertyDeclaration: true, // Enforce types on properties
          // arrayDestructuring: false,
          // objectDestructuring: false,
          // arrowParameter: false, // No need to add types for arrow function parameters
          // memberVariableDeclaration: true, // Enforce typing for class member variables
          // variableDeclaration: true, // Enforce types on variable declarations
        },
      ],

      // this type is for no accept type of [any]
      // '@typescript-eslint/explicit-module-boundary-types': 'error', // Require explicit types on module boundaries

      // check this rule what to do
      '@typescript-eslint/no-explicit-any': [
        'off',
        {
          fixToUnknown: false, // Do not auto-fix `any` to `unknown`
          ignoreRestArgs: true, // Ignore `any` used in rest arguments
          // allowInExplicitTypes: true, // Allow `any` in explicitly defined types
        },
      ],
    },
  },
];
