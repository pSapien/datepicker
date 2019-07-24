import moment from 'moment';

const DAYS_NAME = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generate12MonthsDate = (date, numberOfMonths) =>
  Array.from({ length: numberOfMonths + 1 }).map(
    (_, idx) => new Date(date.getFullYear(), date.getMonth() + idx)
  );

const getFormattedDate = (startDate, endDate, formatter) => {
  const format = date => moment(date).format(formatter);
  let res = '';

  if (startDate) res = `${format(startDate)} - `;
  if (endDate) res += format(endDate);

  return res;
};

const getDiff = (startDate, endDate) =>
  moment(endDate).diff(moment(startDate), 'days');

const MONTH_NAMES = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const getNumDaysInAMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

const getNumFirstDay = (year, numMonth) => new Date(year, numMonth, 1).getDay();

const isDateInRange = (dateToCheck) => (startDate, endDate) => dateToCheck >= startDate && dateToCheck <= endDate

const isSameDate = dateToBeChecked => date => moment(date).isSame(moment(dateToBeChecked));

export {
  DAYS_NAME,
  generate12MonthsDate,
  getFormattedDate,
  getDiff,
  MONTH_NAMES,
  getNumDaysInAMonth,
  getNumFirstDay,
  isSameDate,
  isDateInRange,
 }