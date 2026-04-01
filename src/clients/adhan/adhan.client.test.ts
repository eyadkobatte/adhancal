import { expect, test, describe, beforeAll, setSystemTime } from 'bun:test';

import type { AdhanTimeConfigurationWithoutIdDto } from '../../db/adhanTimeConfiguration/adhanTimeConfiguration.dto';

import adhan from './adhan.client';

describe('getPrayerTimesForToday', () => {
  beforeAll(() => {
    setSystemTime(new Date('2026-03-31T15:00:00.000Z'));
  });
  test('should be defined', () => {
    expect(adhan.getPrayerTimesForToday).toBeDefined();
  });

  test('should return the correct prayer times', () => {
    const configuration: AdhanTimeConfigurationWithoutIdDto = {
      calculationMethod: 'MuslimWorldLeague',
      latitude: 51.5072,
      longitude: -0.1276,
      prayerDuration: 'END',
    };
    const prayerTimes = adhan.getPrayerTimesForToday(configuration);
    expect(prayerTimes).toMatchSnapshot();
  });
});
