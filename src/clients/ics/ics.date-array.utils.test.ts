// oxlint-disable no-magic-numbers
import { expect, test, describe } from 'bun:test';

import getDateArray from './ics.date-array.utils';

describe('getDateArray', () => {
  test('should be defined', () => {
    expect(getDateArray).toBeDefined();
  });
  test('should return the correct date array', () => {
    const date = new Date('2026-12-24T12:30:00Z');
    expect(getDateArray(date)).toEqual([2026, 12, 24, 12, 30]);
  });
});
