import React from 'react';
import ComboboxSelector from '../ComboboxSelector';
import { getHeroImagePath } from '../../../../utils/hero-utils';

const HeroSelector = ({ selectedHero, onChange, availableHeroes, ...props }) => {
  const renderHeroImage = (hero) => (
    <img src={getHeroImagePath(hero, 'small')} alt={hero} className="w-8 h-4.5 object-cover ml-1" />
  );

  const renderOption = (hero, active) => (
    <div className="flex items-center gap-2">
      <img src={getHeroImagePath(hero, 'small')} alt={hero} className="w-6 h-3.5 object-cover" />
      <span>{hero}</span>
    </div>
  );

  return (
    <ComboboxSelector
      selectedItem={selectedHero}
      onChange={onChange}
      availableItems={availableHeroes}
      renderSelectedItem={renderHeroImage}
      renderOption={renderOption}
      placeholder="Select hero..."
      {...props}
    />
  );
};

export default HeroSelector;
