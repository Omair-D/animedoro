import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import {Howl} from 'howler';

// media
import narutoMp3 from '../src/media/naruto_bell.mp3'

// asset
let endSfx = new Howl ({
  src: [ narutoMp3 ],
})

function App() {
  const [ isRunning, setIsRunning ] = useState(false)
  const [ timeMin, setTimeMin ] = useState(40)
  const [ timeSec, setTimeSec ] = useState(0)

  // useEffect
  useEffect(() => {
    if (isRunning){
      const intervalAni = setInterval(() => {
      // Decrease Seconds
      if( timeSec > 0){
        setTimeSec((timeSec) => timeSec -1)
      }
      // Decrease Minutes
      if( timeSec === 0){
        setTimeMin((TimeMin) => timeMin -1)
        setTimeSec(59)
      }
      // Check if time ends
      if(timeMin === 0 && timeSec === 0){
        setIsRunning(false)
        endSfx.play()
      }

      }, 1000)
      return () => clearInterval(intervalAni)
    }
  }, [isRunning, timeMin, timeSec])

  // Component Functions
  const startTimer = () => {
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeMin(40)
    setTimeSec(0)
  }

  // Rendered JSX
  return (
    <div className='container'>
      <div className="d-flex align-items-center flex-column">
        <div className = 'Lead'>
          <h2 className='display-2'>
            Animedoro
          </h2>
        </div>

        <div className='Timer py-4 my-2'>
          <h2 className='display-1 align-self-center'>{timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec }</h2>
          <div className='time-ctrl d-flex justify-content-center flex-row'>

            <Button variant="dark" className='mx-1' size="lg"><h1>-</h1></Button> <Button variant="dark" className='mx-1'><h1>+</h1></Button>

          </div>
        </div>
    </div>
    <div className='Ctrl py-2 my-10 d-grid gap-2 fixed-bottom'>
      <Button variant="dark" size ="lg" onClick={startTimer}>Start</Button>
      <Button variant="secondary" size ="lg" onClick={resetTimer}>Reset</Button>
      <Button variant="light" size ="lg" onClick={pauseTimer}>Pause</Button>
    </div> 
  </div>


  );
}

export default App;