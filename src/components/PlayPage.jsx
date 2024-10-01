/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import Header from './Header';
import ButtonGrid from './ButtonGrid';
import RecordSound from './RecordSound';
import KeyboardHandler from './KeyboardHandler';
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
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (inputs.length > 0 && !selectedInput) {
      setSelectedInput(inputs[0]);
      console.log('Automatically selected input:', selectedInput);
    }
  }, [inputs]);

  useEffect(() => {
    setLoading(true);
    setLoadedCount(0);
    console.log('Sound pack changed:', soundPack);

    const totalSounds = 16;
    let loaded = 0;

    for (let i = 0; i < totalSounds; i++) {
      const audio = new Audio(`sounds/${soundPack}/${i}.wav`);

      audio.onloadeddata = () => {
        if (loaded < totalSounds) {
          loaded += 1;
          console.log(`Sound ${i} loaded. Total loaded: ${loaded}`);
          setLoadedCount(loaded); // Update state based on local `loaded`
        }
      };

      audio.load();
    }
  }, [soundPack]);

  // Hide the loading spinner when all sounds are loaded
  useEffect(() => {
    console.log(`Loaded count: ${loadedCount}`);
    if (loadedCount === 16) {
      setLoading(false);
    }
  }, [loadedCount]);

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

  return (
    <div className='app'>

      <header>
        <Header
          soundPack={soundPack}
          setSoundPack={setSoundPack}
        />
      </header>

      <main className="main">
        {loading ? (
          <div className="spinner"></div> // Loading spinner while sounds are loading
        ) : (
          <>
            <ButtonGrid
              activeNotes={activeNotes}
              setActiveNotes={setActiveNotes}
              soundPack={soundPack}
              userSounds={userSounds}
              setRecordingNote={setRecordingNote}
            />
            <KeyboardHandler
              soundPack={soundPack}
              userSounds={userSounds}
              setActiveNotes={setActiveNotes}
            />
          </>
        )}
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
