import type { BunRequest } from 'bun';
import type { ZodSafeParseResult } from 'zod';

import { object, string } from 'zod';

import adhanTimeConfiguration from '../db/adhanTimeConfiguration.repository';
import logger from '../utils/logger';

const schema = object({
  city: string(),
  country: string(),
});
const validator = async (
  request: BunRequest,
): Promise<ZodSafeParseResult<{ city: string; country: string }>> => {
  const body = await request.json();
  return schema.safeParse(body);
};

const createCalendarEvent = async (request: BunRequest): Promise<Response> => {
  const validated = await validator(request);
  if (!validated.success) {
    logger.error('Error in request', validated.error);
    return new Response(validated.error.message, { status: 400 });
  }
  const id = Bun.randomUUIDv7();
  const { city, country } = validated.data;
  const configuration = adhanTimeConfiguration.create({
    city,
    country,
    id,
  });
  return Response.json({
    configuration,
  });
};

export default createCalendarEvent;
