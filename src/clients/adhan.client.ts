import type { AdhanTimeConfigurationWithoutIdDto } from '../db/adhanTimeConfiguration.repository';

import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

const getPrayerTimesForToday = (
  configuration: AdhanTimeConfigurationWithoutIdDto,
): PrayerTimes => {
  const coordinates = new Coordinates(
    configuration.latitude,
    configuration.longitude,
  );
  const params = CalculationMethod.MoonsightingCommittee();

  if (configuration.fajrAngle) {
    params.fajrAngle = configuration.fajrAngle;
  }
  if (configuration.ishaAngle) {
    params.ishaAngle = configuration.ishaAngle;
  }
  if (configuration.ishaInterval) {
    params.ishaInterval = configuration.ishaInterval;
  }
  if (configuration.maghribAngle) {
    params.maghribAngle = configuration.maghribAngle;
  }
  if (configuration.madhab) {
    params.madhab = configuration.madhab;
  }
  if (configuration.highLatitudeRule) {
    params.highLatitudeRule = configuration.highLatitudeRule;
  }

  const date = new Date();
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  return prayerTimes;
};

const adhan = {
  getPrayerTimesForToday,
};

export default adhan;
