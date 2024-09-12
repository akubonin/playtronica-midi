/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import Header from './Header';
import ButtonGrid from './ButtonGrid';
import RecordSound from './RecordSound';
import './PlayPage.css';
import useMIDI from '../hooks/useMIDI';
import useMIDIHandler from '../hooks/useMIDIHandler';
import playSound from '../helpers/playSound';
import { addActiveNote, removeActiveNote } from '../helpers/noteHelpers';


const PlayPage = () => {
  const { inputs } = useMIDI();
  const [selectedInput, setSelectedInput] = useState(null);
  const [activeNotes, setActiveNotes] = useState([]);
  const [soundPack, setSoundPack] = useState('funky');
  const [userSounds, setUserSounds] = useState({});
  const [recordingNote, setRecordingNote] = useState(null);

  useEffect(() => {
    if (inputs.length > 0 && !selectedInput) {
      setSelectedInput(inputs[0]);
      console.log('Automatically selected input:', selectedInput);
    }
  }, [inputs]);

  const handleMIDIMessage = useCallback((message) => {
    console.log('MIDI message received:', message);
    const [command, note, velocity] = message.data;
    if (command === 144 && velocity > 0) {
      addActiveNote(note, setActiveNotes);
      playSound(note, soundPack, userSounds);
    } else if (command === 128 || (command === 144 && velocity === 0)) {
      removeActiveNote(note, setActiveNotes);
    }
    console.log(`Command: ${command}, Note: ${note}, Velocity: ${velocity}`);
  }, [soundPack, userSounds]);

  useMIDIHandler(selectedInput, handleMIDIMessage, userSounds);

  // const saveRecording = (note, audioBlob) => {
  //   const audioUrl = URL.createObjectURL(audioBlob);
  //   setUserSounds((prevSounds) => ({
  //     ...prevSounds,
  //     [note]: audioUrl,
  //   }));
  //   console.log('User sounds:', userSounds);
  // };


  // const closeRecordSound = () => {
  //   setRecordingNote(null);
  // };



  return (
    <div className='app'>

      <header>
        <Header
          soundPack={soundPack}
          setSoundPack={setSoundPack}
        />
      </header>

      <main className="main">
        <ButtonGrid
          activeNotes={activeNotes}
          setActiveNotes={setActiveNotes}
          soundPack={soundPack}
          userSounds={userSounds}
          setRecordingNote={setRecordingNote}
        />
      </main>

      {recordingNote !== null && (
        <RecordSound
          note={recordingNote}
          setRecordingNote={setRecordingNote}
          setUserSounds={setUserSounds}
          // onClose={closeRecordSound}
          // saveRecording={saveRecording}
        />
      )}
    </div>
  );
}

export default PlayPage;
