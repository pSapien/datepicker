import React from 'react';
import moment from 'moment';
import { DateRangeInput } from '@blueprintjs/datetime';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

const formatDate = date => moment(date).format('MMM ddd YYY');

export default function BlueprintDateRangePicker() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  function handleDateRangeChange(dates) {
    const [startDate, endDate] = dates;

    setStartDate(startDate);
    setEndDate(endDate);
  }

  return (
    <DateRangeInput
      formatDate={formatDate}
      onChange={handleDateRangeChange}
      // parseDate={str => new Date(str)}
      value={[startDate, endDate]}
      shortcuts={false}
    />
  );
}
