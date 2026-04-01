import { beforeAll, describe, expect, setSystemTime, test } from 'bun:test';

import { CalculationParameters, Coordinates, PrayerTimes } from 'adhan';

import getICSString from './ics.client';

describe('getICSString', () => {
  beforeAll(() => {
    setSystemTime(new Date('2026-03-31T15:00:00.000Z'));
  });
  test('should be defined', () => {
    expect(getICSString).toBeDefined();
  });
  test('should return valid ics string', async () => {
    const prayerTimes = new PrayerTimes(
      new Coordinates(0, 0),
      new Date(),
      new CalculationParameters('MuslimWorldLeague'),
    );
    const icsString = await getICSString(prayerTimes);
    expect(icsString).toBeString();
    const cleanedICSString = icsString.replace(/UID:.*/g, 'UID:123');
    expect(cleanedICSString).toMatchSnapshot();
  });
});
