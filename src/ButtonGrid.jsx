import React, {useState} from 'react';
import './ButtonGrid.css';

const ButtonGrid = ({ onButtonClick, activeNotes, soundPack }) => {

  const [activeButton, setActiveButton] = useState(null);

  const playSound = (note) => {
    const audio = new Audio(`/sounds/${soundPack}/${note-36}.wav`);
    audio.play();
  };

  const handleClick = (note) => {
    // setActiveButton(note); // Set the active button
    playSound(note);
    onButtonClick(note);
  };


  const buttons = [];
  for (let i = 36; i <= 51; i++) {
    buttons.push(
      <button
        key={i}
        className={`grid-button ${activeNotes.includes(i) || activeButton === i ? 'active' : ''}`}
        onClick={() => handleClick(i)}
      >
        {i}
      </button>
    );
  }

  return <div className="button-grid">{buttons}</div>;
};

export default ButtonGrid;
