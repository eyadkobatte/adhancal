import type { AdhanTimeConfigurationWithIdDto } from '../../db/adhanTimeConfiguration/adhanTimeConfiguration.dto';
import type { PrayerTimes } from 'adhan';
import type { EventAttributes } from 'ics';

import { DateTime } from 'luxon';

const convertPrayerTimesToICSEvent = (
  prayerTimes: PrayerTimes,
  configuration: AdhanTimeConfigurationWithIdDto,
): EventAttributes[] => {
  const { fajr, sunrise, dhuhr, asr, maghrib, isha } = prayerTimes;

  return [
    {
      busyStatus: 'FREE',
      end: sunrise.getTime(),
      start: fajr.getTime(),
      title: 'Fajr',
      transp: 'TRANSPARENT',
    },
    {
      busyStatus: 'FREE',
      end: asr.getTime(),
      start: dhuhr.getTime(),
      title: 'Dhuhr',
      transp: 'TRANSPARENT',
    },
    {
      busyStatus: 'FREE',
      end: maghrib.getTime(),
      start: asr.getTime(),
      title: 'Asr',
      transp: 'TRANSPARENT',
    },
    {
      busyStatus: 'FREE',
      end: isha.getTime(),
      start: maghrib.getTime(),
      title: 'Maghrib',
      transp: 'TRANSPARENT',
    },
    {
      busyStatus: 'FREE',
      end: DateTime.fromJSDate(isha, { zone: configuration.timezone })
        .endOf('day')
        .toJSDate()
        .getTime(),
      start: isha.getTime(),
      title: 'Isha',
      transp: 'TRANSPARENT',
    },
  ];
};

export default convertPrayerTimesToICSEvent;
