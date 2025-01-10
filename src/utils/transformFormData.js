/**
 * Transforms the nested form data structure into a flat object ready for API submission
 * @param {Object} formData - The nested form data from the form state
 * @returns {Object} - Flattened data structure ready for API submission
 */
export const transformFormDataForSubmission = (formData) => {
  // Start with basic fields
  const transformedData = {
    date: formData.date,
    winner: formData.winner,
    notes: formData.notes,
  };

  // Map team names to their API prefixes
  const teamPrefixes = {
    radiant: 'rad',
    dire: 'dire',
  };

  // Transform team data
  const roles = ['carry', 'mid', 'off', 'soft', 'hard'];
  ['radiant', 'dire'].forEach((team) => {
    const prefix = teamPrefixes[team];
    roles.forEach((role, index) => {
      const player = formData[`${team}Players`][index];
      const fieldPrefix = `${prefix}_${role}`;

      transformedData[`${fieldPrefix}_name`] = player.player;
      transformedData[`${fieldPrefix}_hero`] = player.hero;
      transformedData[`${fieldPrefix}_kills`] = player.kills;
      transformedData[`${fieldPrefix}_deaths`] = player.deaths;
      transformedData[`${fieldPrefix}_assists`] = player.assists;
    });
  });

  // Transform bans - using 'rad' prefix here too
  for (let i = 0; i < 7; i++) {
    transformedData[`rad_ban${i + 1}`] = formData.radiantBans[i];
    transformedData[`dire_ban${i + 1}`] = formData.direBans[i];
  }

  return transformedData;
};

/**
 * Transform API response back into form data structure
 */
export const transformResponseToFormData = (apiData) => {
  const formData = {
    date: apiData.date,
    notes: apiData.notes,
    winner: apiData.winner,
    radiantCaptain: null,
    direCaptain: null,
    radiantBans: Array(7).fill(null),
    direBans: Array(7).fill(null),
    radiantPlayers: Array(5).fill(null),
    direPlayers: Array(5).fill(null),
  };

  // Transform bans
  for (let i = 0; i < 7; i++) {
    formData.radiantBans[i] = apiData[`rad_ban${i + 1}`];
    formData.direBans[i] = apiData[`dire_ban${i + 1}`];
  }

  // Transform player data
  const roles = ['carry', 'mid', 'off', 'soft', 'hard'];
  const teamPrefixes = {
    radiant: 'rad',
    dire: 'dire',
  };

  ['radiant', 'dire'].forEach((team) => {
    const players = [];
    const prefix = teamPrefixes[team];
    roles.forEach((role) => {
      const fieldPrefix = `${prefix}_${role}`;
      players.push({
        player: apiData[`${fieldPrefix}_name`],
        hero: apiData[`${fieldPrefix}_hero`],
        kills: apiData[`${fieldPrefix}_kills`],
        deaths: apiData[`${fieldPrefix}_deaths`],
        assists: apiData[`${fieldPrefix}_assists`],
      });
    });
    formData[`${team}Players`] = players;
  });

  return formData;
};
