import React, { useState } from 'react';
import { Trophy, Crown } from 'lucide-react';
import HeroSelector from '../ui/hero-selector';
import PlayerSelector from '../ui/player-selector';
import { heroes } from '../../data/heroes';
import { players } from '../../data/players';

const ROLES = ['Carry', 'Mid', 'Off', 'Soft', 'Hard'];

const MatchForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
    winner: null, // 'radiant' or 'dire'
    radiantCaptain: null,
    direCaptain: null,
    radiantBans: Array(7).fill(null),
    direBans: Array(7).fill(null),
    radiantPlayers: Array(5).fill({ player: null, hero: null, kills: '', deaths: '', assists: '' }),
    direPlayers: Array(5).fill({ player: null, hero: null, kills: '', deaths: '', assists: '' }),
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};

    if (!formData.date) newErrors.date = 'Required';
    if (!formData.winner) newErrors.winner = 'Required';

    // Validate all players and heroes are selected
    ['radiant', 'dire'].forEach((team) => {
      formData[`${team}Players`].forEach((player, idx) => {
        if (!player.player) newErrors[`${team}Player${idx}`] = 'Required';
        if (!player.hero) newErrors[`${team}Hero${idx}`] = 'Required';
        if (!player.kills) newErrors[`${team}Kills${idx}`] = 'Required';
        if (!player.deaths) newErrors[`${team}Deaths${idx}`] = 'Required';
        if (!player.assists) newErrors[`${team}Assists${idx}`] = 'Required';
      });
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form data:', formData);
      // TODO: Submit to your backend
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Match Entry</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Inhouse</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`mt-1 block w-full rounded-md border ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Optional notes about the match"
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Bans Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Bans</h2>
        <div className="space-y-4">
          {/* Radiant Bans */}
          <div>
            <h3 className="text-lg font-medium text-radiant">Radiant Bans</h3>
            <div className="grid grid-cols-7 gap-2">
              {formData.radiantBans.map((ban, index) => (
                <HeroSelector
                  key={`radiant-ban-${index}`}
                  selectedHero={ban}
                  onChange={(hero) => {
                    const newBans = [...formData.radiantBans];
                    newBans[index] = hero;
                    setFormData({ ...formData, radiantBans: newBans });
                  }}
                  availableHeroes={getAvailableHeroes(ban)}
                />
              ))}
            </div>
          </div>

          {/* Dire Bans */}
          <div>
            <h3 className="text-lg font-medium text-dire">Dire Bans</h3>
            <div className="grid grid-cols-7 gap-2">
              {formData.direBans.map((ban, index) => (
                <HeroSelector
                  key={`dire-ban-${index}`}
                  selectedHero={ban}
                  onChange={(hero) => {
                    const newBans = [...formData.direBans];
                    newBans[index] = hero;
                    setFormData({ ...formData, direBans: newBans });
                  }}
                  availableHeroes={getAvailableHeroes(ban)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Teams Section */}
      {['radiant', 'dire'].map((team) => (
        <div key={team} className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className={`text-xl font-semibold text-${team}`}>
              {team.charAt(0).toUpperCase() + team.slice(1)}
            </h2>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, winner: team })}
              className={`p-2 rounded-full ${
                formData.winner === team ? `bg-${team} text-white` : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Trophy className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            {ROLES.map((role, index) => (
              <div key={`${team}-${role}`} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-2 font-medium">{role}</div>
                <div className="col-span-3">
                  <PlayerSelector
                    selectedPlayer={formData[`${team}Players`][index].player}
                    onChange={(player) => {
                      const newPlayers = [...formData[`${team}Players`]];
                      newPlayers[index] = { ...newPlayers[index], player };
                      setFormData({ ...formData, [`${team}Players`]: newPlayers });
                    }}
                    availablePlayers={getAvailablePlayers(formData[`${team}Players`][index].player)}
                  />
                </div>
                <div className="col-span-3">
                  <HeroSelector
                    selectedHero={formData[`${team}Players`][index].hero}
                    onChange={(hero) => {
                      const newPlayers = [...formData[`${team}Players`]];
                      newPlayers[index] = { ...newPlayers[index], hero };
                      setFormData({ ...formData, [`${team}Players`]: newPlayers });
                    }}
                    availableHeroes={getAvailableHeroes(formData[`${team}Players`][index].hero)}
                  />
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-1">
                  {['kills', 'deaths', 'assists'].map((stat) => (
                    <input
                      key={`${team}-${role}-${stat}`}
                      type="number"
                      min="0"
                      value={formData[`${team}Players`][index][stat]}
                      onChange={(e) => {
                        const newPlayers = [...formData[`${team}Players`]];
                        newPlayers[index] = { ...newPlayers[index], [stat]: e.target.value };
                        setFormData({ ...formData, [`${team}Players`]: newPlayers });
                      }}
                      className={`w-full rounded border ${
                        errors[`${team}${stat.charAt(0).toUpperCase() + stat.slice(1)}${index}`]
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (formData[`${team}Captain`] === index) {
                        setFormData({ ...formData, [`${team}Captain`]: null });
                      } else {
                        setFormData({ ...formData, [`${team}Captain`]: index });
                      }
                    }}
                    className={`p-2 rounded-full ${
                      formData[`${team}Captain`] === index
                        ? `bg-${team} text-white`
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Crown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Match
        </button>
      </div>
    </form>
  );
};

export default MatchForm;
