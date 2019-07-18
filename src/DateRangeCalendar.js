import React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

export default function DateRangeCalendar(props) {
  const [{ startDate, endDate }, setDates] = React.useState({
    startDate: null,
    endDate: null,
  });
  const dateRangePickerRef = React.useRef(null);

  const handleChange = date => {
    const { startDate, endDate } = date;

    setDates({ startDate, endDate });
    dateRangePickerRef.current.focus();
  };

  function handleFocus() {
    dateRangePickerRef.current.show();
  }

  const today = new Date();

  return (
    <DateRangePickerComponent
      startDate={startDate}
      endDate={endDate}
      change={handleChange}
      start={today}
      min={today}
      allowEdit={false}
      focus={handleFocus}
      ref={dateRangePickerRef}
      format="d MMM yyy"
      showClearButton={false}
    />
  );
}
