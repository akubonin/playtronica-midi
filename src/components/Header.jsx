import React from "react";
import { SOUNDPACKS } from "../data/soundPacks";
import './PlayPage.css';

const Header = ({ soundPack, setSoundPack }) => {
  return (
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
  );
}

export default Header;