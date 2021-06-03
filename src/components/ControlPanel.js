import React from 'react';
import '../styles/controlPanel.scss';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import MoodIcon from '@material-ui/icons/Mood';

function ControlPanel({ setEnableAllSounds, setCanPlay }) {
  const handleClick = (bool) => {
    setCanPlay(bool);
  };

  const changeAllSounds = (message) => {
    setEnableAllSounds({ change: message });
  };

  return (
    <div className='controlPanel'>
      <PlayArrowOutlinedIcon
        fontSize='large'
        onClick={() => handleClick(true)}
      />
      <PauseOutlinedIcon fontSize='large' onClick={() => handleClick(false)} />
      <StopOutlinedIcon
        fontSize='large'
        onClick={() => changeAllSounds('disable')}
      />
      <MoodIcon fontSize='large' onClick={() => changeAllSounds('enable')} />
    </div>
  );
}

export default ControlPanel;
