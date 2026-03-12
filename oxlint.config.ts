import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: {
    correctness: 'error',
    nursery: 'off',
    pedantic: 'warn',
    perf: 'warn',
    restriction: 'warn',
    style: 'warn',
    suspicious: 'error',
  },
  env: {
    builtin: true,
  },
  globals: {},
  ignorePatterns: [],
  plugins: ['import', 'typescript', 'eslint'],
  rules: {
    'eslint/no-unused-vars': 'error',
    'import/no-default-export': 'off',
  },
  settings: {},
});
