import type { BunRequest } from 'bun';
import type { ZodSafeParseResult } from 'zod';

import { object, string } from 'zod';

import adhanTimeConfiguration from '../db/adhanTimeConfiguration.repository';

const schema = object({ id: string() });
const validator = (request: BunRequest): ZodSafeParseResult<{ id: string }> => {
  const body = request.params;
  return schema.safeParse(body);
};

const getCalendarEvent = (request: BunRequest): Response => {
  const validated = validator(request);
  if (!validated.success) {
    console.error('Error in request', validated.error);
    return new Response(validated.error.message, { status: 400 });
  }
  const { id } = validated.data;
  const configuration = adhanTimeConfiguration.getOne(id);
  return Response.json({ configuration });
};

export default getCalendarEvent;
