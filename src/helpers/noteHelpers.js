export const addActiveNote = (note, setActiveNotes) => {
  setActiveNotes((prevNotes) => [...prevNotes, note]);
};

export const removeActiveNote = (note, setActiveNotes) => {
  setActiveNotes((prevNotes) => prevNotes.filter((n) => n !== note));
};