import type { BunRequest } from 'bun';
import type { ZodSafeParseResult, infer as ZInfer } from 'zod';

import { object } from 'zod';

import adhan from '../clients/adhan.client';
import AdhanTimeConfigurationSchema from '../db/adhanTimeConfiguration.schema';
import logger from '../utils/logger';

const schema = object({
  adhanConfiguration: AdhanTimeConfigurationSchema,
});
const validator = async (
  request: BunRequest,
): Promise<ZodSafeParseResult<ZInfer<typeof schema>>> => {
  const body = await request.json();
  return schema.safeParse(body);
};

const createCalendarEvent = async (request: BunRequest): Promise<Response> => {
  const validated = await validator(request);
  if (!validated.success) {
    logger.error('Error in request', validated.error);
    return new Response(validated.error.message, {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  const prayerTimes = adhan.getPrayerTimesForToday(
    validated.data.adhanConfiguration,
  );

  return Response.json({
    asr: prayerTimes.asr,
    dhuhr: prayerTimes.dhuhr,
    fajr: prayerTimes.fajr,
    isha: prayerTimes.isha,
    maghrib: prayerTimes.maghrib,
  });
};

export default createCalendarEvent;
