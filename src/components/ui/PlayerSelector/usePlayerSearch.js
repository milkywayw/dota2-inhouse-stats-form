import React, { useState } from 'react';

export const usePlayerSearch = (availablePlayers) => {
  const [query, setQuery] = useState('');

  const filteredPlayers =
    query === ''
      ? availablePlayers
      : availablePlayers.filter((player) => player.toLowerCase().includes(query.toLowerCase()));

  return {
    query,
    setQuery,
    filteredPlayers,
  };
};
