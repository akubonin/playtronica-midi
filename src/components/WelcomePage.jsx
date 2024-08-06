import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/play');
  }

  return (
    <div className="welcome-container">
      <h1>Playtronica Sampler</h1>
      <p>
        Press top left part of your computer keyboard (A to P), turn on your speakers. For help go here.
      </p>
      <p>
        Playtronica Sampler is here to play music online using your keyboard, MIDI device or Playtron. Can be used for music lessons, tinkering workshops and interactive performances. The musical content presented on this site is for non-commercial use only. If your computer is slow, try playing without visuals.
      </p>
      <p>
        support@playtronica.com for assistance. We are here for you.
      </p>
      <button className="play-button" onClick={handlePlayClick}>Play</button>
    </div>
  );
};

export default WelcomePage;