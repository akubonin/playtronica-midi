const playSound = (note, soundPack) => {
  const audio = new Audio(`/sounds/${soundPack}/${note-36}.wav`);
  audio.play().catch(error => {
    console.error(`Failed to play sound${note}.wav:`, error);
  });
};

export default playSound;