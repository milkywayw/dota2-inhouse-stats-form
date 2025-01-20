import ComboboxSelector from '../ComboboxSelector';
import { getHeroImagePath } from '../../../../utils/hero-utils';

const HeroSelector = ({ selectedHero, onChange, availableHeroes, ...props }) => {
  const renderHeroImage = (hero) => (
    <img src={getHeroImagePath(hero, 'small')} alt={hero} className="w-6 h-3.5 object-cover" />
  );

  // For dropdown options, show both image and name
  const renderOption = (hero) => (
    <>
      {renderHeroImage(hero)}
      <span className="text-sm">{hero}</span>
    </>
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
