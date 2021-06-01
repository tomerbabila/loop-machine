import React from 'react';
import '../styles/padsContainer.scss';
import sounds from '../sounds';
import Pad from './Pad';

function PadsContainer() {
  return (
    <div className='padsContainer'>
      {sounds.map((sound, i) => (
        <Pad file={sound} key={i}></Pad>
      ))}
    </div>
  );
}

export default PadsContainer;
