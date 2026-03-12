import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*.{ts}': ['bun lint:check', 'bun fmt:check'],
};

export default config;
