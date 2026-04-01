import type { HighLatitudeRule, Madhab } from 'adhan';

import { CalculationMethod } from 'adhan';
import { Info } from 'luxon';
import { z } from 'zod';

import VALID_CALCULATION_METHODS from '../../clients/adhan/adhan.calculationMethods.constants';
import VALID_HIGH_LATITUDE_RULES from '../../clients/adhan/adhan.highLatitudeRule.constants';
import VALID_MADHABS from '../../clients/adhan/adhan.madhab.constants';

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

const calculationMethod = z.custom<keyof typeof CalculationMethod>(
  (value: unknown) => {
    if (typeof value !== 'string') {
      return false;
    }
    if (
      !VALID_CALCULATION_METHODS.includes(
        value as keyof typeof CalculationMethod,
      )
    ) {
      return false;
    }
    return value;
  },
  { error: 'Invalid calculation method' },
);

const latitude = z
  .number()
  .min(MIN_LATITUDE, 'Invalid latitude')
  .max(MAX_LATITUDE, 'Invalid latitude');

const longitude = z
  .number()
  .min(MIN_LONGITUDE, 'Invalid longitude')
  .max(MAX_LONGITUDE, 'Invalid longitude');

const fajrAngle = z.int().optional();

const highLatitudeRule = z
  .custom<(typeof HighLatitudeRule)[keyof typeof HighLatitudeRule]>(
    (value: unknown) => {
      if (typeof value !== 'string') {
        return false;
      }
      if (value in VALID_HIGH_LATITUDE_RULES) {
        return false;
      }
      return value;
    },
    { error: 'Invalid high latitude rule' },
  )
  .optional();

const ishaAngle = z.int().optional();

const ishaInterval = z.int().optional();

const madhab = z
  .custom<(typeof Madhab)[keyof typeof Madhab]>(
    (value: unknown) => {
      if (typeof value !== 'string') {
        return false;
      }
      if (value in VALID_MADHABS) {
        return false;
      }
      return value;
    },
    { error: 'Invalid madhab' },
  )
  .optional();

const maghribAngle = z.int().optional();

const prayerDuration = z.int().or(z.literal('END'));

const timezone = z.string().refine(
  (value: string) => {
    if (Info.isValidIANAZone(value)) {
      return value;
    }
    return false;
  },
  { error: 'Invalid timezone' },
);

const AdhanTimeConfigurationSchema = z
  .object({
    // Required
    calculationMethod,
    latitude,
    longitude,
    prayerDuration,
    timezone,

    // Optional
    fajrAngle,
    highLatitudeRule,
    ishaAngle,
    ishaInterval,
    madhab,
    maghribAngle,
  })
  .refine(
    (data) => {
      if (data.calculationMethod !== CalculationMethod.Tehran.name) {
        if (data.maghribAngle !== undefined) {
          return false;
        }
      }
      return true;
    },
    {
      error: 'Maghrib angle is not allowed for this calculation method',
      path: ['maghribAngle'],
    },
  );

export default AdhanTimeConfigurationSchema;
