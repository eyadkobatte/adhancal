import type { PrayerTimes } from 'adhan';
import type { EventAttributes } from 'ics';

import { createEventsAsync } from 'ics';
import { DateTime } from 'luxon';

import ICS_CONSTANTS from './ics.constants';

const getDateArray = (date: Date): [number, number, number, number, number] => [
  date.getFullYear(),
  date.getMonth(),
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
];

const convertPrayerTimesToICSEvent = (
  prayerTimes: PrayerTimes,
): EventAttributes[] => {
  const { fajr, sunrise, dhuhr, asr, maghrib, isha } = prayerTimes;

  return [
    {
      busyStatus: 'FREE',
      end: getDateArray(sunrise),
      start: getDateArray(fajr),
      title: 'Fajr',
      transp: 'TRANSPARENT',
    },
    {
      busyStatus: 'FREE',
      end: getDateArray(asr),
      start: getDateArray(dhuhr),
      title: 'Dhuhr',
      transp: 'TRANSPARENT',
    },
    {
      busyStatus: 'FREE',
      end: getDateArray(maghrib),
      start: getDateArray(asr),
      title: 'Asr',
      transp: 'TRANSPARENT',
    },
    {
      busyStatus: 'FREE',
      end: getDateArray(isha),
      start: getDateArray(maghrib),
      title: 'Maghrib',
      transp: 'TRANSPARENT',
    },
    {
      busyStatus: 'FREE',
      end: getDateArray(DateTime.fromJSDate(isha).endOf('day').toJSDate()),
      start: getDateArray(isha),
      title: 'Isha',
      transp: 'TRANSPARENT',
    },
  ];
};

const getICSString = async (prayerTimes: PrayerTimes): Promise<string> => {
  const icsString = await createEventsAsync(
    convertPrayerTimesToICSEvent(prayerTimes),
    {
      calName: ICS_CONSTANTS.CALENDAR_NAME,
      method: ICS_CONSTANTS.METHOD,
      productId: ICS_CONSTANTS.PRODUCT_ID,
    },
  );

  if (icsString.error) {
    throw icsString.error;
  }

  if (icsString.value) {
    return icsString.value;
  }

  throw new Error('Unreachable code. Somethings gone wrong', {
    cause: icsString,
  });
};

export default getICSString;
