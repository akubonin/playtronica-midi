/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import './ButtonGrid.css';
import playSound from '../helpers/playSound';

const ButtonGrid = ({ activeNotes, addActiveNote, removeActiveNote, soundPack }) => {

  const handleClick = (note) => {
    addActiveNote(note);
    playSound(note, soundPack);
    setTimeout(() => removeActiveNote(note), 500);
  };


  const buttons = [];
  for (let note = 36; note <= 51; note++) {
    buttons.push(
      <button
        key={note}
        className={`grid-button ${activeNotes.includes(note) ? 'active' : ''}`}
        onClick={() => handleClick(note)}
      >
        {/* {note} */}
      </button>
    );
  }

  return <div className="button-grid">{buttons}</div>;
};

export default ButtonGrid;
