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
    'import/no-relative-parent-imports': 'off',
    'max-statements': ['error', { max: 20 }],
    'new-cap': 'off',
    'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
    'no-undefined': 'off',
    'sort-imports': 'off',
    'sort-keys': ['error', 'asc', { allowLineSeparatedGroups: true }],
    'typescript/parameter-properties': [
      'error',
      { prefer: 'parameter-property' },
    ],
  },
  settings: {},
});
