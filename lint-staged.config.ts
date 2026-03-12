import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*.{ts}': ['bun lint:fix', 'bun fmt:fix'],
};

export default config;
