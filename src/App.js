import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CalendarWithModal from './MobileDatePicker/CalendarWithModal';

export default function App() {
  const [on, setIsOn] = React.useState(false);

  const toggle = () => setIsOn(!on);

  return (
    <div>
      <CalendarWithModal toggleModal={toggle} isModalOpen={on}/>
    </div>
  );
}
