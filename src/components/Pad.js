import React from 'react';
import useSound from 'use-sound';

function Pad({ file }) {
  const [play] = useSound(file);

  return <div className='pad' onClick={play}></div>;
}

export default Pad;
