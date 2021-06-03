import React, { useContext, useEffect, useRef, useState } from 'react';
import { TimeContext } from '../TimeContext';

function Pad({ file, canPlay }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { timer, setEnableCounter, effectAllSounds, setEffectAllSounds } =
    useContext(TimeContext);

  const handleClick = () => {
    // Change isPlaying state (on / off)
    if (!isPlaying) {
      setEnableCounter((prevCount) => (prevCount += 1));
    } else {
      setEnableCounter((prevCount) => (prevCount -= 1));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Play only when play button is clicked and the pad is on
    if (canPlay && isPlaying) {
      if (timer !== 0) {
        setTimeout(() => {
          if (canPlay) {
            audioRef.current.play();
          }
        }, 8000 - timer);
      } else {
        audioRef.current.play();
      }
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [canPlay, isPlaying]);

  useEffect(() => {
    // Turn on all pads when clicked or stop all pads
    if (effectAllSounds.change === 'enable' && !isPlaying) {
      setIsPlaying(true);
      setEnableCounter((prevCount) => (prevCount += 1));
    }
    if (effectAllSounds.change === 'disable' && isPlaying) {
      setIsPlaying(false);
      setEnableCounter((prevCount) => (prevCount -= 1));
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setEffectAllSounds(false);
  }, [effectAllSounds]);

  return (
    <div
      onClick={handleClick}
      className={isPlaying ? 'playing pad' : 'notPlaying pad'}
    >
      <audio src={file} ref={audioRef} loop={true}></audio>
    </div>
  );
}

export default Pad;
