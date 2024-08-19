/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ButtonGrid from './ButtonGrid';
import './PlayPage.css';
import useMIDI from '../helpers/useMIDI';
import playSound from '../helpers/playSound';
import { SOUNDPACKS} from '../data/soundPacks';


const PlayPage = () => {
  const { inputs } = useMIDI();
  const [selectedInput, setSelectedInput] = useState(null);
  const [activeNotes, setActiveNotes] = useState([]);
  const [soundPack, setSoundPack] = useState('funky');
  const [userSounds, setUserSounds] = useState({});

  useEffect(() => {
    if (inputs.length > 0 && !selectedInput) {
      console.log('Automatically selecting first input:', inputs[0]);
      setSelectedInput(inputs[0]);
      console.log('Automatically selected input:', selectedInput);
    }
  }, [inputs]);

  useEffect(() => {
    if (selectedInput) {
      selectedInput.onmidimessage = handleMIDIMessage;
      console.log('Registered MIDI message handler for input:', selectedInput);
    }
  }, [selectedInput]);

  const addActiveNote = (note) => {
    setActiveNotes((prevNotes) => [...prevNotes, note]);
  }

  const removeActiveNote = (note) => {
    setActiveNotes((prevNotes) => prevNotes.filter((n) => n !== note));
  }

  const handleMIDIMessage = (message) => {
    console.log('MIDI message received:', message);
    const [command, note, velocity] = message.data;
    if (command === 144 && velocity > 0) {
      addActiveNote(note);
      playSound(note, soundPack, userSounds);
    } else if (command === 128 || (command === 144 && velocity === 0)) {
      removeActiveNote(note);
    }
    console.log(`Command: ${command}, Note: ${note}, Velocity: ${velocity}`);
  };


  return (
    <div className='app'>

      <header>
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="soundpack-select-container">
          <select
            className="soundpack-select"
            value={soundPack}
            onChange={(e) => setSoundPack(e.target.value)}
          >
            {SOUNDPACKS.map((pack) => (
              <option key={pack} value={pack}>
                {pack.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="main">
        <ButtonGrid
          activeNotes={activeNotes}
          addActiveNote={addActiveNote}
          removeActiveNote={removeActiveNote}
          soundPack={soundPack}
        />
      </main>

    </div>
  );
}

export default PlayPage;
