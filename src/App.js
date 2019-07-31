import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import MobileDateRangePickerInput from './MobileDatePicker/MobileDateRangePickerInput';

const formatDate = date => moment(date).format('DD MMM YYYY');

export default function App() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  function handleDoneClick(startDate, endDate) { 
    setStartDate(formatDate(startDate));
    setEndDate(formatDate(endDate));
  };

  return (
    <div>
      <MobileDateRangePickerInput
        initialStartDate={startDate}
        initialEndDate={endDate}
        onDoneClick={handleDoneClick}
      />
    </div>
  );
}
