import React from 'react';
import '../styles/padsContainer.scss';
import sounds from '../sounds';
import Pad from './Pad';

function PadsContainer({ canPlay }) {
  return (
    <div className='padsContainer'>
      {sounds.map((sound, i) => (
        <Pad file={sound} canPlay={canPlay} key={i}></Pad>
      ))}
    </div>
  );
}

export default PadsContainer;
