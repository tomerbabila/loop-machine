import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import PadsContainer from './components/PadsContainer';
import { TimeContext } from './TimeContext';
import ControlPanel from './components/ControlPanel';

function App() {
  const [timer, setTimer] = useState(0); // An global timer
  const [enableCounter, setEnableCounter] = useState(0); // Check if there are pads on
  const [canPlay, setCanPlay] = useState(false);
  const [effectAllSounds, setEffectAllSounds] = useState(false);

  useEffect(() => {
    if (canPlay && enableCounter > 0) {
      const interval = setInterval(() => {
        if (timer === 7000) {
          setTimer(0);
        } else {
          setTimer((prevTime) => (prevTime += 10));
        }
      }, 10);
      return () => clearInterval(interval);
    } else {
      setTimer(0);
      return;
    }
  }, [timer, enableCounter, canPlay]);

  return (
    <TimeContext.Provider
      value={{ timer, setEnableCounter, effectAllSounds, setEffectAllSounds }}
    >
      <div className='App'>
        <h1>Loop Machine</h1>
        <div>
          <PadsContainer canPlay={canPlay} />
        </div>
        <ControlPanel
          setCanPlay={setCanPlay}
          setEnableAllSounds={setEffectAllSounds}
        />
      </div>
    </TimeContext.Provider>
  );
}

export default App;
