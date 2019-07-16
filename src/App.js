import React from 'react';
import './App.css';

import 'react-dates/initialize';
import DateRangePickerWrapper from './DateRangePickerWrapper';
import SingleDatePickerWrapper from './SingleDatePickerWrapper';

export default function App() {
  return (
    <>
      <div>
        <div>Desktop DateRangePicker</div>
        <DateRangePickerWrapper orientation="vertical" verticalHeight={568} />
      </div>
      <div>
        <div>Single DatePicker</div>
        <SingleDatePickerWrapper />
      </div>
    </>
  );
}
