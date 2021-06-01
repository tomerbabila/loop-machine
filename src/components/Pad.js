import React, { useContext, useRef, useState } from 'react';
import { TimeContext } from '../TimeContext';

function Pad({ file }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { timer, setEnableCounter } = useContext(TimeContext);

  const handleClick = () => {
    if (!isPlaying) {
      if (timer !== 0) {
        setEnableCounter((prevCount) => (prevCount += 1));
        setTimeout(() => {
          audioRef.current.play();
        }, 8000 - timer);
      } else {
        setEnableCounter((prevCount) => (prevCount += 1));
        audioRef.current.play();
      }
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setEnableCounter((prevCount) => (prevCount -= 1));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='pad' onClick={handleClick}>
      <audio src={file} ref={audioRef} loop={true}></audio>
    </div>
  );
}

export default Pad;
