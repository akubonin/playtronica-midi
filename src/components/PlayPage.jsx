/* eslint-disable no-unused-vars */
// src/App.jsx
import React, { useEffect, useState } from 'react';
import useMIDI from '../helpers/useMIDI';
import ButtonGrid from './ButtonGrid';
import './ButtonGrid.css'; // Import the CSS file


function App() {
  const { inputs, outputs } = useMIDI();
  const [selectedInput, setSelectedInput] = useState(null);
  const [activeNotes, setActiveNotes] = useState([]);
  const [soundPack, setSoundPack] = useState('funky');


  useEffect(() => {
    if (inputs.length > 0 && !selectedInput) {
      console.log('Automatically selecting first input:', inputs[0]);
      setSelectedInput(inputs[0]);
      console.log('Automatically selected input:', selectedInput);
    }
  }, [inputs, selectedInput]);

  useEffect(() => {
    if (selectedInput) {
      selectedInput.onmidimessage = handleMIDIMessage;
      console.log('Registered MIDI message handler for input:', selectedInput);
    }
  }, [selectedInput, soundPack]);


  const SOUNDPACKS = ['funky', 'omma', 'dati', 'emotions', 'cucumber'];

  const handleMIDIMessage = (message) => {
    console.log('MIDI message received:', message);
    const [command, note, velocity] = message.data;
    if (command === 144 && velocity > 0) {
      setActiveNotes((prevNotes) => [...prevNotes, note]);
      playSound(note);
    } else if (command === 128 || (command === 144 && velocity === 0)) {
      setActiveNotes((prevNotes) => prevNotes.filter((n) => n !== note));
    }
    console.log(`Command: ${command}, Note: ${note}, Velocity: ${velocity}`);
  };

  const playSound = (note) => {
    console.log(soundPack)

    const audio = new Audio(`/playtronica-midi/sounds/${soundPack}/${note-36}.wav`);
    audio.play().catch(error => {
      console.error(`Failed to play sound${note}.wav:`, error);
    });
  };

  const handleButtonClick = (midiNumber) => {
    if (selectedInput) {
      const output = outputs[0]; // Assuming the first output is the desired one
      if (output) {
        output.send([144, midiNumber, 127]); // Note on
        setTimeout(() => {
          output.send([128, midiNumber, 0]); // Note off
        }, 100);
      }
    }
  };

  return (
    <div className='app'>
      <header>
        <img src="/playtronica-midi/logo.png" alt="Logo" className="logo" />
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
        <ButtonGrid onButtonClick={handleButtonClick} activeNotes={activeNotes} soundPack={soundPack} />
      </main>
      <div>
        <h2>Choose soundpack</h2>
      </div>

    </div>
  );
}

export default App;
