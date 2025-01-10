import { TEAMS } from '../../formConfig.js';
import HeroSelector from '../ui/selectors/HeroSelector/index';

const BansSection = ({ formData, setFormData, getAvailableHeroes, touched }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Bans</h2>
    <div className="space-y-4">
      {TEAMS.map((team) => (
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
);

export default BansSection;
