import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Howl } from 'howler';
import './App.css';
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
  const [onBreak, setOnBreak] = useState(false);
  const [workInterval, setWorkInterval] = useState(0);
  const [breakInterval, setBreakInterval] = useState(0);
  const [initialWorkTime, setInitialWorkTime] = useState(40); // Store the user-set work time

  useEffect(() => {
    if (isRunning) {
      const intervalAni = setInterval(() => {
        // Decrease seconds first
        if (timeSec > 0) {
          setTimeSec((timeSec) => timeSec - 1);
        } else if (timeSec === 0) {
          if (timeMin === 0) {
            // When both minutes and seconds reach 0
            endSfx.play();
            setIsRunning(false); // Pause the timer
            if (!onBreak) {
              // If it's a work interval ending
              setWorkInterval((workInterval) => workInterval + 1);
              setOnBreak(true); // Start break timer
              setTimeMin(23);
              setTimeSec(0);
              setIsRunning(true); // Automatically start break timer
            } else {
              // If it's a break interval ending
              setBreakInterval((breakInterval) => breakInterval + 1);
              setOnBreak(false); // Start work timer
              setTimeMin(initialWorkTime); // Reset to the user-set work time
              setTimeSec(0);
              setIsRunning(true); // Automatically start work timer
            }
          } else {
            // Decrease minutes and reset seconds
            setTimeMin((timeMin) => timeMin - 1);
            setTimeSec(59);
          }
        }
      }, 1000);
      return () => clearInterval(intervalAni);
    }
  }, [isRunning, timeMin, timeSec, onBreak, initialWorkTime]);

  // Component Functions
  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setOnBreak(false);
    setTimeMin(initialWorkTime); // Reset to user-set work time
    setTimeSec(0);
    setWorkInterval(0);
    setBreakInterval(0);
  };

  const reduceTime = () => {
    if (timeMin > 40) {
      setTimeMin((timeMin) => timeMin - 1);
      setInitialWorkTime((initialWorkTime) => initialWorkTime - 1); // Update initial work time
    }
  };

  const increaseTime = () => {
    if (timeMin < 60) {
      setTimeMin((timeMin) => timeMin + 1);
      setInitialWorkTime((initialWorkTime) => initialWorkTime + 1); // Update initial work time
    }
  };

  // Rendered JSX
  return (
    <div className='app-container'>
      <div className="d-flex align-items-center flex-column">
        <div className='Lead'>
          <h2 className='display-2'>Animedoro</h2>
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
        <h2 className='h2' style={{ color: 'white' }}>
          📚 {workInterval} / 📺 {breakInterval}
        </h2>
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
