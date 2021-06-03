import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import PadsContainer from './components/PadsContainer';
import { TimeContext } from './TimeContext';
import ControlPanel from './components/ControlPanel';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

function App() {
  const [timer, setTimer] = useState(0);
  const [enableCounter, setEnableCounter] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [effectAllSounds, setEffectAllSounds] = useState(false);
  const [recordUrl, setRecordUrl] = useState(null);

  useEffect(() => {
    // Set timer after play button clicked and there is more then 0 pads on
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
        <PadsContainer canPlay={canPlay} />
        <ControlPanel
          setCanPlay={setCanPlay}
          setEnableAllSounds={setEffectAllSounds}
          setRecordUrl={setRecordUrl}
        />
        <div style={{ width: '60vh', height: '1vh' }}>
          {recordUrl ? <AudioPlayer src={recordUrl} /> : null}
        </div>
      </div>
    </TimeContext.Provider>
  );
}

export default App;
