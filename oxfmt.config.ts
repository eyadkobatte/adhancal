import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 80,
  quoteProps: 'consistent',
  singleQuote: true,
  sortImports: {
    groups: [
      'builtin',
      'type',
      'external',
      ['internal', 'subpath'],
      ['parent', 'sibling', 'index'],
      'style',
      'unknown',
    ],
  },
});
