import ComboboxSelector from '../ComboboxSelector';

const PlayerSelector = ({ selectedPlayer, onChange, availablePlayers, ...props }) => {
  return (
    <ComboboxSelector
      selectedItem={selectedPlayer}
      onChange={onChange}
      availableItems={availablePlayers}
      renderSelectedItem={() => null}
      renderOption={(player) => <span>{player}</span>}
      placeholder="Select player..."
      allowAddNew={true}
      {...props}
    />
  );
};

export default PlayerSelector;
