import type { BunRequest } from 'bun';
import type { ZodSafeParseResult, infer as ZInfer } from 'zod';

import { object, string } from 'zod';

import adhan from '../clients/adhan/adhan.client';
import getICSString from '../clients/ics/ics.client';
import adhanTimeConfiguration from '../db/adhanTimeConfiguration/adhanTimeConfiguration.repository';
import logger from '../utils/logger';

const schema = object({ id: string() });
const validator = (
  request: BunRequest,
): ZodSafeParseResult<ZInfer<typeof schema>> => {
  const body = request.params;
  return schema.safeParse(body);
};

const getCalendarEvent = async (request: BunRequest): Promise<Response> => {
  const validated = validator(request);
  if (!validated.success) {
    logger.error('Error in request', validated.error);
    return new Response(validated.error.message, { status: 400 });
  }
  const headers = new Headers({
    'Content-Disposition': `attachment; filename=adhancal-${validated.data.id}.ics`,
    'Content-Type': 'text/calendar; charset=utf-8',
  });

  const { id } = validated.data;
  const configuration = adhanTimeConfiguration.getOne(id);
  const prayerTimes = adhan.getPrayerTimesForToday(configuration);

  const ics = await getICSString(prayerTimes, configuration);

  return new Response(ics, { headers });
};

export default getCalendarEvent;
