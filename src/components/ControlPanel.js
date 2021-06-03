import React, { useState } from 'react';
import '../styles/controlPanel.scss';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import MoodIcon from '@material-ui/icons/Mood';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Recorder from '../modules/Recorder';

function ControlPanel({ setEnableAllSounds, setCanPlay, setRecordUrl }) {
  const [isRecording, setIsRecording] = useState(false);
  const [record, setRecord] = useState(null);

  const handlePlayStop = (bool) => {
    // Handle play / stop buttons
    setCanPlay(bool);
  };

  const changeAllSounds = (message) => {
    // Handle 'play all pads' (smiley) and stop buttons
    setEnableAllSounds({ change: message });
    if (message === 'disable') {
      setCanPlay(false);
    }
  };

  const startRecord = () => {
    // Start a new record
    const audioContext = new window.AudioContext();
    navigator.mediaDevices
      .getDisplayMedia({ audio: true, video: true }) // Use device and not mic / camera
      .then((stream) => {
        const input = audioContext.createMediaStreamSource(stream);
        const rec = new Recorder(input, { numChannels: 1 });
        rec.record();
        setRecord(rec);
      })
      .catch((err) => console.log('Uh oh... unable to get stream...', err));
  };

  function stopRecord() {
    // Stop record
    record.stop();
    record.exportWAV((blob) => {
      let blobUrl = URL.createObjectURL(blob);
      setRecordUrl(blobUrl);
    });
  }

  const handleRecord = () => {
    // Handle record button
    isRecording ? stopRecord() : startRecord();
    setIsRecording(!isRecording);
  };

  return (
    <div className='controlPanel'>
      <PlayArrowOutlinedIcon
        fontSize='large'
        onClick={() => handlePlayStop(true)}
      />
      <PauseOutlinedIcon
        fontSize='large'
        onClick={() => handlePlayStop(false)}
      />
      <StopOutlinedIcon
        fontSize='large'
        onClick={() => changeAllSounds('disable')}
      />
      <MoodIcon fontSize='large' onClick={() => changeAllSounds('enable')} />
      {isRecording ? (
        <RadioButtonCheckedIcon fontSize='large' onClick={handleRecord} />
      ) : (
        <RadioButtonUncheckedIcon fontSize='large' onClick={handleRecord} />
      )}
    </div>
  );
}

export default ControlPanel;
