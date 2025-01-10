import HeroSelector from '../ui/selectors/HeroSelector/index';
import PlayerSelector from '../ui/selectors/PlayerSelector/index';
import KDAInput from '../ui/inputs/KdaInput/index';
import Tooltip from '../ui/tooltip';
import { Crown } from 'lucide-react';

const PlayerRow = ({
  team,
  role,
  index,
  playerData,
  formData,
  setFormData,
  getAvailablePlayers,
  getAvailableHeroes,
  touched,
  errors,
}) => (
  <div className="flex items-center gap-4">
    <div className="w-16 text-sm font-medium">{role}</div>
    <div className="w-64">
      <PlayerSelector
        selectedPlayer={playerData.player}
        onChange={(player) => {
          const newPlayers = [...formData[`${team}Players`]];
          newPlayers[index] = { ...newPlayers[index], player };
          setFormData({
            ...formData,
            [`${team}Players`]: newPlayers,
          });
        }}
        availablePlayers={getAvailablePlayers(playerData.player)}
        error={touched && errors[`${team}Player${index}`]}
      />
    </div>
    <div className="w-64">
      <HeroSelector
        selectedHero={playerData.hero}
        onChange={(hero) => {
          const newPlayers = [...formData[`${team}Players`]];
          newPlayers[index] = { ...newPlayers[index], hero };
          setFormData({
            ...formData,
            [`${team}Players`]: newPlayers,
          });
        }}
        availableHeroes={getAvailableHeroes(playerData.hero)}
        error={touched && errors[`${team}Hero${index}`]}
      />
    </div>
    <KDAInput
      kills={playerData.kills}
      deaths={playerData.deaths}
      assists={playerData.assists}
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
          const captain = formData[`${team}Captain`] === index ? null : index;
          setFormData({
            ...formData,
            [`${team}Captain`]: captain,
          });
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
);

export default PlayerRow;
