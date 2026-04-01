import type { DateTime } from 'luxon';

const getDateArray = (
  date: DateTime,
): [number, number, number, number, number] => [
  date.year,
  date.month,
  date.day,
  date.hour,
  date.minute,
];

export default getDateArray;
