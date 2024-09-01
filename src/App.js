import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


function App() {
  const [ isRunning, setIsRunning ] = useState(false)
  const [ timeMin, setTimeMin ] = useState(40)
  const [ timeSec, setTimeSec ] = useState(0)

  // Rendered JSX
  return (
    <div className='container'>
      <div className="d-flex align-items-center flex-column">
        <div className = 'Lead'>
          <h2 className='display-2'>
            Animedoro Timer
          </h2>
        </div>

        <div className='Timer py-4 my-2'>
          <h2 className='display-1 align-self-center'>{timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec }</h2>
        </div>
    </div>
    <div className='Ctrl py-2 my-10 d-grid gap-2 fixed-bottom'>
      <Button variant="dark" size ="lg">Start</Button>
      <Button variant="secondary" size ="lg">Reset</Button>
      <Button variant="light" size ="lg">Pause</Button>
    </div> 
  </div>


  );
}

export default App;