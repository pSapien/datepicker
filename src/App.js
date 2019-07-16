import React from 'react';
import './App.css';

import 'react-dates/initialize';
import DesktopDateRangePickerWrapper from './DesktopDateRangePickerWrapper';
import SingleDatePickerWrapper from './SingleDatePickerWrapper';

export default function App() {
  return (
    <>
      <div>
        <div>Desktop DateRangePicker</div>
        <DesktopDateRangePickerWrapper />
      </div>
      <div>
        <div>Single DatePicker</div>
        <SingleDatePickerWrapper />
      </div>
    </>
  );
}
