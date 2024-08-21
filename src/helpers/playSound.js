const playSound = (note, soundPack, userSounds) => {
  if (userSounds[note]) {
    const audio = new Audio(userSounds[note]);
    audio.play().catch(error => {
      console.error(`Failed to play user sound ${userSounds[note]}:`, error);
    });
  } else {
    const audio = new Audio(`/sounds/${soundPack}/${note-36}.wav`);
    audio.play().catch(error => {
      console.error(`Failed to play sound${note}.wav:`, error);
    });
  }
};

export default playSound;