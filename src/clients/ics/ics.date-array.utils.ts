const MONTH_STARTS_FROM_ZERO_OFFSET = 1;

const getDateArray = (date: Date): [number, number, number, number, number] => [
  date.getFullYear(),
  date.getMonth() + MONTH_STARTS_FROM_ZERO_OFFSET,
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
];

export default getDateArray;
