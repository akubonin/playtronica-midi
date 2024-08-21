import { useEffect } from "react";
import useMIDI from "./useMIDI";

const useMIDIHandler = (selectedInput, handleMIDIMessage, userSounds) => {
  useEffect(() => {
    if (selectedInput) {
      selectedInput.onmidimessage = handleMIDIMessage;
      console.log("Registered MIDI message handler for input:", selectedInput);
    }
  }, [selectedInput, userSounds]);
};

export default useMIDIHandler;