import type { AdhanTimeConfigurationWithIdDto } from '../../db/adhanTimeConfiguration/adhanTimeConfiguration.dto';
import type { PrayerTimes } from 'adhan';

import { createEventsAsync } from 'ics';

import ICS_CONSTANTS from './ics.constants';
import convertPrayerTimesToICSEvent from './ics.conversion.utils';

const getICSString = async (
  prayerTimes: PrayerTimes,
  configuration: AdhanTimeConfigurationWithIdDto,
): Promise<string> => {
  const icsString = await createEventsAsync(
    convertPrayerTimesToICSEvent(prayerTimes, configuration),
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
