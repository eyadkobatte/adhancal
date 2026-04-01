import { expect, test, describe } from 'bun:test';

import VALID_CALCULATION_METHODS from '../../clients/adhan/adhan.calculationMethods.constants';
import AdhanTimeConfigurationSchema from './adhanTimeConfiguration.schema';

describe('AdhanTimeConfigurationSchema', () => {
  test('should be defined', () => {
    expect(AdhanTimeConfigurationSchema).toBeDefined();
  });
  describe('calculationMethod', () => {
    test('should throw error for invalid method', () =>
      expect(() =>
        AdhanTimeConfigurationSchema.parse({
          calculationMethod: 'invalid',
          latitude: 0,
          longitude: 0,
          prayerDuration: 0,
          timezone: 'UTC',
        }),
      ).toThrow('Invalid calculation method'));
    test.each(Object.values(VALID_CALCULATION_METHODS))(
      'should accept %s',
      (method) => {
        const result = AdhanTimeConfigurationSchema.parse({
          calculationMethod: method,
          latitude: 0,
          longitude: 0,
          prayerDuration: 0,
          timezone: 'UTC',
        });
        expect(result).toBeDefined();
      },
    );
  });
  describe('latitude', () => {
    test('should throw error for invalid latitude', () =>
      expect(() =>
        AdhanTimeConfigurationSchema.parse({
          calculationMethod: 'MuslimWorldLeague',
          latitude: 91,
          longitude: 0,
          prayerDuration: 0,
          timezone: 'UTC',
        }),
      ).toThrow('Invalid latitude'));
  });
  describe('Timezone', () => {
    test('should throw error for invalid timezone', () =>
      expect(() =>
        AdhanTimeConfigurationSchema.parse({
          calculationMethod: 'MuslimWorldLeague',
          latitude: 0,
          longitude: 0,
          prayerDuration: 0,
          timezone: 'INVALID',
        }),
      ).toThrow('Invalid timezone'));
    test('should accept a valid timezone', () =>
      expect(
        AdhanTimeConfigurationSchema.parse({
          calculationMethod: 'MuslimWorldLeague',
          latitude: 0,
          longitude: 0,
          prayerDuration: 0,
          timezone: 'UTC',
        }),
      ).toBeDefined());
  });
  describe('Edge cases', () => {
    test('Maghrib angle is only allowed for Tehran Method', () => {
      expect(() =>
        AdhanTimeConfigurationSchema.parse({
          calculationMethod: 'MuslimWorldLeague',
          latitude: 0,
          longitude: 0,
          maghribAngle: 18,
          prayerDuration: 0,
          timezone: 'UTC',
        }),
      ).toThrow('Maghrib angle is not allowed for this calculation method');
    });
  });
});
