import type AdhanTimeConfigurationSchema from './adhanTimeConfiguration.schema';
import type { z } from 'zod';

type AdhanTimeConfigurationWithoutIdDto = z.infer<
  typeof AdhanTimeConfigurationSchema
>;

type AdhanTimeConfigurationWithIdDto = AdhanTimeConfigurationWithoutIdDto & {
  id: string;
};

// oxlint-disable-next-line import/no-named-export
export type {
  AdhanTimeConfigurationWithIdDto,
  AdhanTimeConfigurationWithoutIdDto,
};
