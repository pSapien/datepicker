import React from 'react';
import Flatpickr from 'react-flatpickr';

import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';

import 'flatpickr/dist/themes/airbnb.css';

export default function FlatpickrDatePicker() {
  const [date, setDate] = React.useState(null);

  return (
    <div>
      <Flatpickr
        options={{
          plugins: [new rangePlugin({ input: '#secondRangeInput' })],
          allowInput: false,
          disableMobile: true,
          dateFormat: 'd M Y',
          minDate: 'today',
        }}
      />
      <input id="secondRangeInput" />
    </div>
  );
}
