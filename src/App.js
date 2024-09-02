import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Howl } from 'howler';

// media
import narutoMp3 from '../src/media/naruto_bell.mp3';

// asset
let endSfx = new Howl({
  src: [narutoMp3],
});

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeMin, setTimeMin] = useState(40);
  const [timeSec, setTimeSec] = useState(0);
  const [ onBreak, setOnBreak ] = useState(false)
  const [workInterval, setWorkInterval ] = useState(0)
  const [ breakInterval, setBreakInterval ] = useState(0)


  // useEffect 
  useEffect(() => {
    if (isRunning){
      const intervalAni = setInterval(() => {
        // Decrease Seconds
        if( timeSec > 0){
          setTimeSec((timeSec) => timeSec -1 )
        }
        // Decrease Minutes 
        if( timeSec === 0){
          setTimeMin((timeMin) => timeMin -1)
          setTimeSec(59)
        }
        // Check if time ends 
        if(timeMin === 0 && timeSec === 0){
          setTimeSec(0)
          setTimeMin(0)
          narutoMp3.play()
          // Keep track of intervals
          if(!onBreak){
            setWorkInterval((workInterval) => workInterval + 1)
            
            
            if(workInterval > 0 && workInterval % 3 === 0){
              setTimeMin(25)
            } else {
              setTimeMin(23)
            }
            setOnBreak(true)
          }
          if (onBreak) {
            setBreakInterval((breakInterval) => breakInterval + 1)
            setTimeMin(25)
            setOnBreak(false)
          }
         
        }
      }, 1000)
      return () => {

        clearInterval(intervalAni)
      }
    }
  }, [isRunning, timeMin, timeSec, workInterval, breakInterval])

  // Component Functions
  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeMin(40);
    setTimeSec(0);
  };

  const reduceTime = () => {
    if (timeMin > 40) {
      setTimeMin((timeMin) => timeMin - 1);
    }
  };

  const increaseTime = () => {
    if (timeMin < 60) {
      setTimeMin((timeMin) => timeMin + 1);
    }
  };

  // Rendered JSX
  return (
    <div className='container'>
      <div className="d-flex align-items-center flex-column">
        <div className='Lead'>
          <h2 className='display-2'>
            Animedoro
          </h2>
        </div>

        <div className='Timer py-4 my-2'>
          <h2 className='display-1 align-self-center'>
            {timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec}
          </h2>
          <div className='time-ctrl d-flex justify-content-center flex-row'>
            <Button
              variant="dark"
              className='mx-1'
              size="lg"
              onClick={reduceTime}
              disabled={isRunning || timeMin === 40}
            >
              <h1>-</h1>
            </Button>
            <Button
              variant="dark"
              className='mx-1'
              size="lg"
              onClick={increaseTime}
              disabled={isRunning || timeMin === 60}
            >
              <h1>+</h1>
            </Button>
            
          </div>
          
        </div>
        <h2 className='h2'><span>📚{workInterval}</span>/📺{breakInterval}</h2>
      </div>
      <div className='Ctrl py-2 my-10 d-grid gap-2 fixed-bottom'>
        
        <Button variant="dark" size="lg" onClick={startTimer}>Start</Button>
        <Button variant="secondary" size="lg" onClick={resetTimer}>Reset</Button>
        <Button variant="light" size="lg" onClick={pauseTimer}>Pause</Button>
      </div>
    </div>
  );
}

export default App;
