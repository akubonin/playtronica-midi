import React, { useEffect, useCallback } from 'react';
import { addActiveNote, removeActiveNote } from '../helpers/noteHelpers';
import playSound from '../helpers/playSound';

const keyToNoteMap = {
  'a': 36,
  'w': 37,
  's': 38,
  'e': 39,
  'd': 40,
  'f': 41,
  't': 42,
  'g': 43,
  'y': 44,
  'h': 45,
  'u': 46,
  'j': 47,
  'k': 48,
  'o': 49,
  'l': 50,
  'p': 51
};

const KeyboardHandler = ({ soundPack, userSounds, setActiveNotes}) => {
  const handleKeyDown = useCallback(
    (event) => {
      const note = keyToNoteMap[event.key.toLowerCase()];
      if (note) {
        addActiveNote(note, setActiveNotes);
        playSound(note, soundPack, userSounds);
        setTimeout(() => removeActiveNote(note, setActiveNotes), 500);
      }
    },
    [soundPack, userSounds, setActiveNotes]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return null; // No visual component, just event handling
};

export default KeyboardHandler;
