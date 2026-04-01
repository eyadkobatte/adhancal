import { beforeAll, describe, expect, setSystemTime, test } from 'bun:test';

import type { AdhanTimeConfigurationWithIdDto } from '../../db/adhanTimeConfiguration/adhanTimeConfiguration.dto';

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
    const configuration: AdhanTimeConfigurationWithIdDto = {
      calculationMethod: 'MuslimWorldLeague',
      id: '1',
      latitude: 0,
      longitude: 0,
      prayerDuration: 0,
      timezone: 'UTC',
    };
    const events = convertPrayerTimesToICSEvent(prayerTimes, configuration);
    expect(events).toMatchSnapshot();
  });
  test('should handle different timezone', () => {
    const prayerTimes = new PrayerTimes(
      new Coordinates(0, 0),
      new Date(),
      new CalculationParameters('MuslimWorldLeague'),
    );
    const configuration: AdhanTimeConfigurationWithIdDto = {
      calculationMethod: 'MuslimWorldLeague',
      id: '1',
      latitude: 0,
      longitude: 0,
      prayerDuration: 0,
      timezone: 'America/Los_Angeles',
    };
    const events = convertPrayerTimesToICSEvent(prayerTimes, configuration);
    expect(events).toMatchSnapshot();
  });
});
