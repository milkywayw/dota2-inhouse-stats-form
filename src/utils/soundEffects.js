const base = import.meta.env.BASE_URL;

// Create audio instances with updated paths
const meepMerp = new Audio(`${base}sounds/meep_merp.mp3`);
const duelDrums = new Audio(`${base}sounds/duel_drum.mpeg`);
const victoryHorn = new Audio(`${base}sounds/horn.mpeg`);
const victoryCheer = new Audio(`${base}sounds/cheer.mpeg`);
const blink = new Audio(`${base}sounds/blink.mpeg`);

// Set volumes
duelDrums.volume = 0.2;
victoryHorn.volume = 0.3;
victoryCheer.volume = 0.3;
blink.volume = 0.7;

// Configure duel drums to loop
duelDrums.loop = true;

export const playMeepMerp = () => {
  meepMerp.currentTime = 0;
  meepMerp.play().catch((error) => {
    console.warn('Could not play meep merp:', error);
  });
};

export const startDuelDrums = () => {
  // Stop victory sounds
  victoryHorn.pause();
  victoryHorn.currentTime = 0;
  victoryCheer.pause();
  victoryCheer.currentTime = 0;

  duelDrums.currentTime = 0;
  duelDrums.play().catch((error) => {
    console.warn('Could not play duel drums:', error);
  });
};

export const stopDuelDrums = () => {
  duelDrums.pause();
  duelDrums.currentTime = 0;
};

export const playVictorySounds = () => {
  // Stop duel drums first
  stopDuelDrums();

  // Reset and play both victory sounds
  victoryHorn.currentTime = 0;
  victoryCheer.currentTime = 0;

  // Play both sounds
  Promise.all([victoryHorn.play(), victoryCheer.play()]).catch((error) => {
    console.warn('Could not play victory sounds:', error);
  });
};

export const playBlink = () => {
  blink.currentTime = 0;
  blink.play().catch((error) => {
    console.warn('Could not play blink sound:', error);
  });
};
