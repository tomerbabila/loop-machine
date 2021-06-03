import React, { useState } from 'react';
import '../styles/controlPanel.scss';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import MoodIcon from '@material-ui/icons/Mood';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Recorder from '../modules/Recorder';

function ControlPanel({ setEnableAllSounds, setCanPlay }) {
  const [isRecording, setIsRecording] = useState(false);
  const [record, setRecord] = useState(null);
  const [recordUrl, setRecordUrl] = useState(null);

  const handleClick = (bool) => {
    setCanPlay(bool);
  };

  const changeAllSounds = (message) => {
    setEnableAllSounds({ change: message });
  };

  const startRecord = () => {
    const audioContext = new window.AudioContext();

    navigator.mediaDevices
      .getDisplayMedia({ audio: true, video: true })
      .then((stream) => {
        const input = audioContext.createMediaStreamSource(stream);
        const rec = new Recorder(input, { numChannels: 1 });
        rec.record();
        setRecord(rec);
      })
      .catch((err) => console.log('Uh oh... unable to get stream...', err));
  };

  function stopRecord() {
    record.stop();
    record.exportWAV((blob) => {
      let blobUrl = URL.createObjectURL(blob);
      setRecordUrl(blobUrl);
    });
  }

  const handleRecord = () => {
    // handle record button
    isRecording ? stopRecord() : startRecord();
    setIsRecording(!isRecording);
  };

  return (
    <div className='controlPanel'>
      <div classname='buttonsContainer'>
        <PlayArrowOutlinedIcon
          fontSize='large'
          onClick={() => handleClick(true)}
        />
        <PauseOutlinedIcon
          fontSize='large'
          onClick={() => handleClick(false)}
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
      <div className='recordPlayer'>
        {recordUrl ? <audio controls src={recordUrl}></audio> : null}
      </div>
    </div>
  );
}

export default ControlPanel;
