import React, { useRef, useState } from 'react';

function Pad({ file }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClick = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
