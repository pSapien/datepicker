import React from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

const format = date => moment(date).format('DD MMM YYYY');

export default function BootstrapDateRangePicker() {
  const [{ startDate, endDate }, setDates] = React.useState({
    startDate: null,
    endDate: null,
  });

  function onDatesChange(e, dates) {
    const { startDate, endDate } = dates;

    setDates({ startDate, endDate });
  }

  const formattedDate =
    startDate && endDate && [startDate, endDate].map(format).join('-');
  const today = new Date();

  return (
    <DateRangePicker onApply={onDatesChange} minDate={today}>
      <input value={formattedDate} />
    </DateRangePicker>
  );
}
