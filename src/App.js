import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MobileDatePicker from './MobileDatePicker';
// import BootstrapDateRangePicker from './BootstrapDateRangePicker';
// import DatePicker from './Calendar/DatePicker'

export default function App() {
  return (
    <div>
      {/* <BootstrapDateRangePicker /> */}
      <MobileDatePicker />
      {/* <DatePicker label="Birthday" value="2000-08-15" /> */}
    </div>
  );
}
