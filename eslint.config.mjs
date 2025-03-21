/* eslint-disable */
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import nodePlugin from 'eslint-plugin-n';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const commonRules = {
  'no-var': 'error',
  'prefer-const': 'error',
  eqeqeq: ['error', 'always'],
  'no-unused-vars': ['error', { argsIgnorePattern: '^_|req|res|next|val' }],
  'arrow-body-style': ['error', 'as-needed'],
  'prefer-template': 'error',
  'object-shorthand': 'error',
  'array-callback-return': 'error',
  curly: ['error', 'all'],
  'no-multiple-empty-lines': ['error', { max: 1 }],
  semi: ['error', 'always'],
  quotes: ['error', 'single', { avoidEscape: true }],
  'comma-dangle': ['error', 'always-multiline'],
  'no-trailing-spaces': 'error',
  'space-before-function-paren': ['error', 'never'],
  'eol-last': 'error',
  'no-alert': 'error',
  'no-debugger': 'warn',
};

export default defineConfig([
  {
    // Note: there should be no other properties in this object
    ignores: ['eslint.config.mjs', 'node_modules/', '*.min.js'],
  },
  {
    // For .cjs files (CommonJS)
    files: ['**/*.cjs'],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: 'commonjs',
      parserOptions: {
        sourceType: 'commonjs', // Ensure CommonJS parsing for `.cjs` files
      },
    },
    plugins: { js, node: nodePlugin },
    extends: ['js/recommended'],
    rules: {
      strict: ['error', 'global'],
      ...commonRules,
    },
  },
  {
    // For .mjs files (ES Modules)
    files: ['**/*.mjs'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      sourceType: 'module', // Ensure parsing as an ES module for `.mjs` files
      parserOptions: {
        sourceType: 'module', // Important for `.mjs` files
      },
    },
    plugins: { js, node: nodePlugin },
    extends: ['js/recommended'],
    rules: {
      strict: ['off'],
      ...commonRules,
    },
  },
  {
    // For .js files (CommonJS by default, treat as such)
    files: ['**/*.js'],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: 'commonjs', // Treat .js files as CommonJS by default
      parserOptions: {
        sourceType: 'commonjs', // Treat `.js` as CommonJS
      },
    },
    plugins: { js, node: nodePlugin },
    extends: ['js/recommended'],
    rules: {
      ...commonRules,
    },
  },
  {
    ...nodePlugin.configs['flat/recommended-script'],
  },
  {
    rules: {
      'n/exports-style': ['error', 'module.exports'],
    },
  },
  eslintPluginPrettierRecommended,
]);
