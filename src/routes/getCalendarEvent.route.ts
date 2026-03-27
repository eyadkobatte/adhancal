import type { BunRequest } from 'bun';
import type { ZodSafeParseResult, infer as ZInfer } from 'zod';

import { object, string } from 'zod';

import adhan from '../clients/adhan.client';
import adhanTimeConfiguration from '../db/adhanTimeConfiguration.repository';
import logger from '../utils/logger';

const schema = object({ id: string() });
const validator = (
  request: BunRequest,
): ZodSafeParseResult<ZInfer<typeof schema>> => {
  const body = request.params;
  return schema.safeParse(body);
};

const getCalendarEvent = (request: BunRequest): Response => {
  const validated = validator(request);
  if (!validated.success) {
    logger.error('Error in request', validated.error);
    return new Response(validated.error.message, { status: 400 });
  }
  const { id } = validated.data;
  const configuration = adhanTimeConfiguration.getOne(id);
  const prayerTimes = adhan.getPrayerTimesForToday(configuration);
  return Response.json({ configuration, prayerTimes });
};

export default getCalendarEvent;
