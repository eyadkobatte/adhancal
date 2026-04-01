import { beforeAll, describe, expect, setSystemTime, test } from 'bun:test';

import { CalculationParameters, Coordinates, PrayerTimes } from 'adhan';

import convertPrayerTimesToICSEvent from './ics.conversion.utils';

describe('convertPrayerTimesToICSEvent', () => {
  beforeAll(() => {
    setSystemTime(new Date('2026-03-31T15:00:00.000Z'));
  });
  test('should be defined', () => {
    expect(convertPrayerTimesToICSEvent).toBeDefined();
  });
  test('should convert valid prayer time to events', () => {
    const prayerTimes = new PrayerTimes(
      new Coordinates(0, 0),
      new Date(),
      new CalculationParameters('MuslimWorldLeague'),
    );
    const events = convertPrayerTimesToICSEvent(prayerTimes);
    expect(events).toMatchSnapshot();
  });
});
