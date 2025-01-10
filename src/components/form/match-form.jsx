import React, { useState } from 'react';
import { Trophy, Crown, Loader2 } from 'lucide-react';
import Tooltip from '../ui/tooltip';
import HeroSelector from '../ui/selectors/HeroSelector/index';
import PlayerSelector from '../ui/selectors/PlayerSelector/index';
import KDAInput from '../ui/inputs/KdaInput/index';
import { heroes } from '../../data/heroes';
import { players } from '../../data/players';
import { MatchSubmissionDialog } from '../ui/dialog/MatchSubmissionDialog/index';

const ROLES = ['Carry', 'Mid', 'Off', 'Soft', 'Hard'];
const KDA_LABELS = { kills: 'K', deaths: 'D', assists: 'A' };

const MatchForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
    winner: null,
    radiantCaptain: null,
    direCaptain: null,
    radiantBans: Array(7).fill(null),
    direBans: Array(7).fill(null),
    radiantPlayers: Array(5).fill({
      player: null,
      hero: null,
      kills: '',
      deaths: '',
      assists: '',
    }),
    direPlayers: Array(5).fill({
      player: null,
      hero: null,
      kills: '',
      deaths: '',
      assists: '',
    }),
  });

  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const resetForm = () => {
    setFormData({
      date: '',
      notes: '',
      winner: null,
      radiantCaptain: null,
      direCaptain: null,
      radiantBans: Array(7).fill(null),
      direBans: Array(7).fill(null),
      radiantPlayers: Array(5).fill({
        player: null,
        hero: null,
        kills: '',
        deaths: '',
        assists: '',
      }),
      direPlayers: Array(5).fill({
        player: null,
        hero: null,
        kills: '',
        deaths: '',
        assists: '',
      }),
    });
    setTouched(false);
    setErrors({});
    setSubmitStatus(null);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (validate()) {
      const data = {
        date: formData.date,
        winner: formData.winner,
        notes: formData.notes,
        rad_carry_name: formData.radiantPlayers[0].player,
        rad_carry_hero: formData.radiantPlayers[0].hero,
        rad_carry_kills: formData.radiantPlayers[0].kills,
        rad_carry_deaths: formData.radiantPlayers[0].deaths,
        rad_carry_assists: formData.radiantPlayers[0].assists,
        rad_mid_name: formData.radiantPlayers[1].player,
        rad_mid_hero: formData.radiantPlayers[1].hero,
        rad_mid_kills: formData.radiantPlayers[1].kills,
        rad_mid_deaths: formData.radiantPlayers[1].deaths,
        rad_mid_assists: formData.radiantPlayers[1].assists,
        rad_off_name: formData.radiantPlayers[2].player,
        rad_off_hero: formData.radiantPlayers[2].hero,
        rad_off_kills: formData.radiantPlayers[2].kills,
        rad_off_deaths: formData.radiantPlayers[2].deaths,
        rad_off_assists: formData.radiantPlayers[2].assists,
        rad_soft_name: formData.radiantPlayers[3].player,
        rad_soft_hero: formData.radiantPlayers[3].hero,
        rad_soft_kills: formData.radiantPlayers[3].kills,
        rad_soft_deaths: formData.radiantPlayers[3].deaths,
        rad_soft_assists: formData.radiantPlayers[3].assists,
        rad_hard_name: formData.radiantPlayers[4].player,
        rad_hard_hero: formData.radiantPlayers[4].hero,
        rad_hard_kills: formData.radiantPlayers[4].kills,
        rad_hard_deaths: formData.radiantPlayers[4].deaths,
        rad_hard_assists: formData.radiantPlayers[4].assists,
        dire_carry_name: formData.direPlayers[0].player,
        dire_carry_hero: formData.direPlayers[0].hero,
        dire_carry_kills: formData.direPlayers[0].kills,
        dire_carry_deaths: formData.direPlayers[0].deaths,
        dire_carry_assists: formData.direPlayers[0].assists,
        dire_mid_name: formData.direPlayers[1].player,
        dire_mid_hero: formData.direPlayers[1].hero,
        dire_mid_kills: formData.direPlayers[1].kills,
        dire_mid_deaths: formData.direPlayers[1].deaths,
        dire_mid_assists: formData.direPlayers[1].assists,
        dire_off_name: formData.direPlayers[2].player,
        dire_off_hero: formData.direPlayers[2].hero,
        dire_off_kills: formData.direPlayers[2].kills,
        dire_off_deaths: formData.direPlayers[2].deaths,
        dire_off_assists: formData.direPlayers[2].assists,
        dire_soft_name: formData.direPlayers[3].player,
        dire_soft_hero: formData.direPlayers[3].hero,
        dire_soft_kills: formData.direPlayers[3].kills,
        dire_soft_deaths: formData.direPlayers[3].deaths,
        dire_soft_assists: formData.direPlayers[3].assists,
        dire_hard_name: formData.direPlayers[4].player,
        dire_hard_hero: formData.direPlayers[4].hero,
        dire_hard_kills: formData.direPlayers[4].kills,
        dire_hard_deaths: formData.direPlayers[4].deaths,
        dire_hard_assists: formData.direPlayers[4].assists,
        rad_ban1: formData.radiantBans[0],
        rad_ban2: formData.radiantBans[1],
        rad_ban3: formData.radiantBans[2],
        rad_ban4: formData.radiantBans[3],
        rad_ban5: formData.radiantBans[4],
        rad_ban6: formData.radiantBans[5],
        rad_ban7: formData.radiantBans[6],
        dire_ban1: formData.direBans[0],
        dire_ban2: formData.direBans[1],
        dire_ban3: formData.direBans[2],
        dire_ban4: formData.direBans[3],
        dire_ban5: formData.direBans[4],
        dire_ban6: formData.direBans[5],
        dire_ban7: formData.direBans[6],
      };

      setIsSubmitting(true);

      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxebPLujmwxQmB-mb-ybZN2c1yMhhv4fHygWTcbqps-V3QOsMj8d8DrXbCslFFGawIBwA/exec',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();

        if (result.status === 'success') {
          setSubmitStatus('success');
        } else {
          setSubmitStatus('error');
          console.error('Submission failed:', result.message);
        }
      } catch (error) {
        console.error('Submission error:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <>
      <div className="max-w-7xl mx-auto p-4 transition-colors">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Match Entry</h1>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm mb-1">Date of Inhouse</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`px-3 py-2 rounded border ${
                  errors.date && touched ? 'border-theme-error' : 'border-theme-border'
                }`}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Notes</label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Optional notes about the match"
                className="w-full px-3 py-2 rounded border border-theme-border"
              />
            </div>
          </div>
        </div>

        {/* Bans Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Bans</h2>
          <div className="space-y-4">
            {['radiant', 'dire'].map((team) => (
              <div key={`${team}-bans`}>
                <h3
                  className={`text-sm font-medium mb-2 ${
                    team === 'radiant' ? 'text-theme-radiant' : 'text-theme-dire'
                  }`}
                >
                  {team.charAt(0).toUpperCase() + team.slice(1)} Bans
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {formData[`${team}Bans`].map((ban, index) => (
                    <HeroSelector
                      key={`${team}-ban-${index}`}
                      selectedHero={ban}
                      onChange={(hero) => {
                        const newBans = [...formData[`${team}Bans`]];
                        newBans[index] = hero;
                        setFormData({ ...formData, [`${team}Bans`]: newBans });
                      }}
                      availableHeroes={getAvailableHeroes(ban)}
                      error={touched && !ban}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teams Section */}
        {['radiant', 'dire'].map((team) => (
          <div key={team} className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Tooltip content={`Mark ${team} team as winner!`}>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      winner: formData.winner === team ? null : team,
                    })
                  }
                  className={`p-2 rounded-full transition-colors border-2 ${
                    formData.winner === team
                      ? 'bg-theme-winner text-theme-winner-text border-theme-winner'
                      : touched && !formData.winner
                        ? 'border-theme-error'
                        : 'border-theme-border-muted hover:border-theme-winner'
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                </button>
              </Tooltip>
              <h2
                className={`text-xl font-semibold ${
                  team === 'radiant' ? 'text-theme-radiant' : 'text-theme-dire'
                }`}
              >
                {team.charAt(0).toUpperCase() + team.slice(1)}
              </h2>
            </div>

            <div className="space-y-3">
              {ROLES.map((role, index) => (
                <div key={`${team}-${role}`} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium">{role}</div>
                  <div className="w-64">
                    <PlayerSelector
                      selectedPlayer={formData[`${team}Players`][index].player}
                      onChange={(player) => {
                        const newPlayers = [...formData[`${team}Players`]];
                        newPlayers[index] = { ...newPlayers[index], player };
                        setFormData({
                          ...formData,
                          [`${team}Players`]: newPlayers,
                        });
                      }}
                      availablePlayers={getAvailablePlayers(
                        formData[`${team}Players`][index].player
                      )}
                      error={touched && errors[`${team}Player${index}`]}
                    />
                  </div>
                  <div className="w-64">
                    <HeroSelector
                      selectedHero={formData[`${team}Players`][index].hero}
                      onChange={(hero) => {
                        const newPlayers = [...formData[`${team}Players`]];
                        newPlayers[index] = { ...newPlayers[index], hero };
                        setFormData({
                          ...formData,
                          [`${team}Players`]: newPlayers,
                        });
                      }}
                      availableHeroes={getAvailableHeroes(formData[`${team}Players`][index].hero)}
                      error={touched && errors[`${team}Hero${index}`]}
                    />
                  </div>
                  <KDAInput
                    kills={formData[`${team}Players`][index].kills}
                    deaths={formData[`${team}Players`][index].deaths}
                    assists={formData[`${team}Players`][index].assists}
                    onChange={(newKDA) => {
                      const newPlayers = [...formData[`${team}Players`]];
                      newPlayers[index] = { ...newPlayers[index], ...newKDA };
                      setFormData({
                        ...formData,
                        [`${team}Players`]: newPlayers,
                      });
                    }}
                    touched={touched}
                    errors={{
                      kills: errors[`${team}Kills${index}`],
                      deaths: errors[`${team}Deaths${index}`],
                      assists: errors[`${team}Assists${index}`],
                    }}
                  />
                  <Tooltip content="Mark this player as the team drafter!">
                    <button
                      type="button"
                      onClick={() => {
                        if (formData[`${team}Captain`] === index) {
                          setFormData({
                            ...formData,
                            [`${team}Captain`]: null,
                          });
                        } else {
                          setFormData({
                            ...formData,
                            [`${team}Captain`]: index,
                          });
                        }
                      }}
                      className={`p-2 rounded-full transition-colors border-2 ${
                        formData[`${team}Captain`] === index
                          ? 'bg-theme-winner text-theme-winner-text border-theme-winner'
                          : 'border-theme-border-muted hover:border-theme-winner'
                      }`}
                    >
                      <Crown className="w-5 h-5" />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 rounded font-medium theme-transition-short ${
            isSubmitting
              ? 'bg-theme-surface-secondary text-theme-text-muted cursor-not-allowed'
              : 'bg-theme-primary hover:bg-theme-primary-dark text-theme-primary-text'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit Match'
          )}
        </button>
      </div>

      <MatchSubmissionDialog
        isOpen={isSubmitting || submitStatus !== null}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        onClose={() => {
          if (!isSubmitting) {
            setSubmitStatus(null);
            resetForm();
          }
        }}
        onReset={resetForm}
      />
    </>
  );
};

export default MatchForm;
