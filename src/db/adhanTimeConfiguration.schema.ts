import type { HighLatitudeRule, Madhab } from 'adhan';

import { CalculationMethod } from 'adhan';
import { z } from 'zod';

import VALID_CALCULATION_METHODS from '../clients/adhan.calculationMethods.constants';
import VALID_HIGH_LATITUDE_RULES from '../clients/adhan.highLatitudeRule.constants';
import VALID_MADHABS from '../clients/adhan.madhab.constants';

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

const AdhanTimeConfigurationSchema = z
  .object({
    // Required
    calculationMethod: z.custom<keyof typeof CalculationMethod>(
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
    ),
    latitude: z
      .number()
      .min(MIN_LATITUDE, 'Invalid latitude')
      .max(MAX_LATITUDE, 'Invalid latitude'),
    longitude: z
      .number()
      .min(MIN_LONGITUDE, 'Invalid longitude')
      .max(MAX_LONGITUDE, 'Invalid longitude'),

    // Optional
    fajrAngle: z.int().optional(),
    highLatitudeRule: z
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
      .optional(),
    ishaAngle: z.int().optional(),
    ishaInterval: z.int().optional(),
    madhab: z
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
      .optional(),
    maghribAngle: z.int().optional(),
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
