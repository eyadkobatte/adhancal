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
        }),
      ).toThrow('Invalid calculation method'));
    test.each(Object.values(VALID_CALCULATION_METHODS))(
      'should accept %s',
      (method) => {
        const result = AdhanTimeConfigurationSchema.parse({
          calculationMethod: method,
          latitude: 0,
          longitude: 0,
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
        }),
      ).toThrow('Invalid latitude'));
  });
  describe('Edge cases', () => {
    test('Maghrib angle is only allowed for Tehran Method', () => {
      expect(() =>
        AdhanTimeConfigurationSchema.parse({
          calculationMethod: 'MuslimWorldLeague',
          latitude: 0,
          longitude: 0,
          maghribAngle: 18,
        }),
      ).toThrow('Maghrib angle is not allowed for this calculation method');
    });
  });
});
