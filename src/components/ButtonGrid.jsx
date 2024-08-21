/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import './ButtonGrid.css';
import playSound from '../helpers/playSound';
import { addActiveNote, removeActiveNote } from '../helpers/noteHelpers';

const ButtonGrid = ({ activeNotes, soundPack, setActiveNotes, userSounds, onRecord }) => {


  const handleClick = (note) => {
    addActiveNote(note, setActiveNotes);
    playSound(note, soundPack, userSounds);
    setTimeout(() => removeActiveNote(note, setActiveNotes), 500);
  };

  const handleDoubleClick = (note) => {
    onRecord(note);
  };


  const buttons = [];
  for (let note = 36; note <= 51; note++) {
    buttons.push(
      <button
        key={note}
        className={`grid-button ${activeNotes.includes(note) ? 'active' : ''}`}
        onClick={() => handleClick(note)}
        onDoubleClick={() => handleDoubleClick(note)}
      >
        {/* {note} */}
      </button>
    );
  }

  return (
  <div>
    <div className="button-grid">{buttons}</div>
  </div>
  )
};

export default ButtonGrid;
