export const ROLES = ['Carry', 'Mid', 'Off', 'Soft', 'Hard'];
export const TEAMS = ['radiant', 'dire'];

export const initialPlayerState = {
  player: null,
  hero: null,
  kills: '',
  deaths: '',
  assists: '',
};

export const initialFormState = {
  date: '',
  notes: '',
  winner: null,
  radiantCaptain: null,
  direCaptain: null,
  radiantBans: Array(7).fill(null),
  direBans: Array(7).fill(null),
  radiantPlayers: Array(5).fill(initialPlayerState),
  direPlayers: Array(5).fill(initialPlayerState),
};
