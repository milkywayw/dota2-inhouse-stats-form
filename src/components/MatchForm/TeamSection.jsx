import React from 'react';
import { Trophy } from 'lucide-react';
import Tooltip from '../ui/tooltip';
import PlayerRow from './PlayerSection';
import { ROLES } from '../../formConfig';

const TeamSection = ({
  team,
  formData,
  setFormData,
  getAvailablePlayers,
  getAvailableHeroes,
  touched,
  errors,
}) => {
  const handleWinnerSelect = () => {
    setFormData({
      ...formData,
      winner: formData.winner === team ? null : team,
    });
  };

  const getTeamColor = () => {
    return team === 'radiant' ? 'text-theme-radiant' : 'text-theme-dire';
  };

  const getWinnerButtonClasses = () => {
    if (formData.winner === team) {
      return 'bg-theme-winner text-theme-winner-text border-theme-winner';
    }
    if (touched && !formData.winner) {
      return 'border-theme-error';
    }
    return 'border-theme-border-muted hover:border-theme-winner';
  };

  return (
    <div className="mb-8">
      {/* Team Header */}
      <div className="flex items-center gap-4 mb-4">
        <Tooltip content={`Mark ${team} team as winner!`}>
          <button
            type="button"
            onClick={handleWinnerSelect}
            className={`p-2 rounded-full transition-colors border-2 ${getWinnerButtonClasses()}`}
          >
            <Trophy className="w-5 h-5" />
          </button>
        </Tooltip>
        <h2 className={`text-xl font-semibold ${getTeamColor()}`}>
          {team.charAt(0).toUpperCase() + team.slice(1)}
        </h2>
      </div>

      {/* Player Rows */}
      <div className="space-y-3">
        {ROLES.map((role, index) => (
          <PlayerRow
            key={`${team}-${role}`}
            team={team}
            role={role}
            index={index}
            playerData={formData[`${team}Players`][index]}
            formData={formData}
            setFormData={setFormData}
            getAvailablePlayers={getAvailablePlayers}
            getAvailableHeroes={getAvailableHeroes}
            touched={touched}
            errors={errors}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
