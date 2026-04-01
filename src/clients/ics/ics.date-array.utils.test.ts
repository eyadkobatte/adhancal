// oxlint-disable no-magic-numbers
import { expect, test, describe, beforeAll } from 'bun:test';

import { DateTime, Settings } from 'luxon';

import getDateArray from './ics.date-array.utils';

describe('getDateArray', () => {
  beforeAll(() => {
    Settings.now = (): number => new Date('2026-03-31T15:00:00.000Z').getTime();
  });
  test('should be defined', () => {
    expect(getDateArray).toBeDefined();
  });

  const testCases: {
    date: DateTime;
    expected: [number, number, number, number, number];
  }[] = [
    {
      date: DateTime.fromISO('2026-12-24T12:30:00Z'),
      expected: [2026, 12, 24, 12, 30],
    },
    {
      date: DateTime.fromISO('2026-03-31T00:00:00Z'),
      expected: [2026, 3, 31, 0, 0],
    },
  ];

  test.each(testCases)(
    'should return the correct date array',
    ({ date, expected }) => {
      expect(getDateArray(date)).toEqual(expected);
    },
  );
});
