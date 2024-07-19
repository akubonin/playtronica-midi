// src/useMIDI.js
import { useEffect, useState } from 'react';

const useMIDI = () => {
  const [midiAccess, setMidiAccess] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
      console.error('WebMIDI is not supported in this browser.');
    }
  }, []);

  const onMIDISuccess = (midiAccess) => {
    setMidiAccess(midiAccess);
    setInputs(Array.from(midiAccess.inputs.values()));
    setOutputs(Array.from(midiAccess.outputs.values()));
  };

  const onMIDIFailure = () => {
    console.error('Could not access MIDI devices.');
  };

  return { midiAccess, inputs, outputs };
};

export default useMIDI;
