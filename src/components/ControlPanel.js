import React from 'react';

function ControlPanel({ canPlay, setCanPlay }) {
  const handleClick = () => {
    if (!canPlay) {
      setCanPlay(true);
    } else {
      setCanPlay(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{!canPlay ? 'play' : 'stop'}</button>
    </div>
  );
}

export default ControlPanel;
