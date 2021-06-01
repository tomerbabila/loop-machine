import React, { useState } from 'react';
import useSound from 'use-sound';

function Pad({ file }) {
  const [play, { stop }] = useSound(file);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (!isPlaying) {
      play();
    } else {
      stop();
    }
    setIsPlaying(!isPlaying);
  };

  return <div className='pad' onClick={handleClick}></div>;
}

export default Pad;
