import { useState } from 'react';
import { initialFormState } from '../formConfig';
import { heroes } from '../data/heroes';
import { players } from '../data/players';

export const useMatchForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.date) newErrors.date = true;
    if (!formData.winner) newErrors.winner = true;

    ['radiant', 'dire'].forEach((team) => {
      formData[`${team}Players`].forEach((player, idx) => {
        if (!player.player) newErrors[`${team}Player${idx}`] = true;
        if (!player.hero) newErrors[`${team}Hero${idx}`] = true;
        if (!player.kills) newErrors[`${team}Kills${idx}`] = true;
        if (!player.deaths) newErrors[`${team}Deaths${idx}`] = true;
        if (!player.assists) newErrors[`${team}Assists${idx}`] = true;
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setTouched(false);
    setErrors({});
    setSubmitStatus(null);
  };

  const getAvailableHeroes = (currentHero) => {
    const selectedHeroes = [
      ...formData.radiantBans,
      ...formData.direBans,
      ...formData.radiantPlayers.map((p) => p.hero),
      ...formData.direPlayers.map((p) => p.hero),
    ].filter((hero) => hero && hero !== currentHero);

    return heroes.filter((hero) => !selectedHeroes.includes(hero));
  };

  const getAvailablePlayers = (currentPlayer) => {
    const selectedPlayers = [
      ...formData.radiantPlayers.map((p) => p.player),
      ...formData.direPlayers.map((p) => p.player),
    ].filter((player) => player && player !== currentPlayer);

    return players.filter((player) => !selectedPlayers.includes(player));
  };

  return {
    formData,
    setFormData,
    touched,
    setTouched,
    errors,
    isSubmitting,
    setIsSubmitting,
    submitStatus,
    setSubmitStatus,
    validate,
    resetForm,
    getAvailableHeroes,
    getAvailablePlayers,
  };
};
