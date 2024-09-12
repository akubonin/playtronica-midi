/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import './RecordSound.css';

const RecordSound = ({ note, setRecordingNote, setUserSounds}) => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle'); // 'idle', 'recording', 'recorded'
  const [fileName, setFileName] = useState(''); // State to store the uploaded file name
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setAudioBlob(audioBlob);
      setRecordingStatus('recorded');
    };

    mediaRecorderRef.current.start();
    setRecordingStatus('recording');
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingStatus('idle');
  };

  const restartRecording = () => {
    resetRecording();
    startRecording();
  }

  const saveRecording = (note, audioBlob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    setUserSounds((prevSounds) => ({
      ...prevSounds,
      [note]: audioUrl,
    }));
    setRecordingNote(null);
  };

  const onClose = () => {
    setRecordingNote(null);
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioBlob(file);
      setFileName(file.name); // Set the file name to be displayed
      setRecordingStatus('recorded');
    }
  };


  return (
    <div className="record-sound-modal">
      <h4>Input {note}</h4>

      <label className="upload-button-label">
        <span className="upload-button">Upload a sound or..</span>
        <input
          type="file"
          accept="audio/*"
          className="upload-input"
          onChange={handleFileUpload}
        />
      </label>

      {fileName && <p className="file-name">{fileName}</p>}

      {recordingStatus === 'idle' && (
        <div className="record-section">
          {/* <p>or</p> */}

          <div
            className="record-button"
            onClick={startRecording}
          >
          </div>

          {/* <p>record new sound</p> */}

          <div className="controls">
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      )}

      {recordingStatus === 'recording' && (
        <div className="record-section">
          {/* <p>or</p> */}
          <div
            className="record-button recording"
            onClick={stopRecording}
          >
            <div className="record-indicator"></div>
          </div>
          <p>Recording...</p>
        </div>
      )}

      {recordingStatus === 'recorded' && (
        <div className="record-section">
          {/* <p>or</p> */}
          <div
            className="record-button"
            onClick={restartRecording}
          >
          </div>
          {/* <p>record new sound</p> */}
          <div>
            <audio controls src={URL.createObjectURL(audioBlob)} />
          </div>
          <div className="controls">
            <button onClick={() => saveRecording(note, audioBlob)}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default RecordSound;