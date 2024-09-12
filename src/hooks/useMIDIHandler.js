import { useEffect } from "react";

const useMIDIHandler = (selectedInput, handleMIDIMessage, userSounds) => {
  useEffect(() => {
    if (selectedInput) {
      selectedInput.onmidimessage = handleMIDIMessage;
      console.log("Registered MIDI message handler for input:", selectedInput);
    }
  }, [selectedInput, userSounds, handleMIDIMessage]);
};

export default useMIDIHandler;