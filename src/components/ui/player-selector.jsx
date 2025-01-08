import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

const PlayerSelector = ({
  selectedPlayer,
  onChange,
  availablePlayers,
  placeholder = 'Select player...',
  disabled = false,
  error = false,
}) => {
  const [query, setQuery] = useState('');

  const filteredPlayers =
    query === ''
      ? availablePlayers
      : availablePlayers.filter((player) => player.toLowerCase().includes(query.toLowerCase()));

  return (
    <Combobox value={selectedPlayer} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <div
          className={`flex rounded overflow-hidden border transition-colors ${
            error ? 'border-theme-error' : 'border-theme-border'
          }`}
        >
          <Combobox.Input
            className="w-full px-2 py-1 text-sm border-none focus:ring-0 combobox-input text-theme-text placeholder-theme-text-muted"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(player) => player}
            placeholder={placeholder}
          />
          <Combobox.Button className="px-2 bg-theme-surface-secondary border-l border-theme-border">
            <ChevronDown className="h-4 w-4 text-theme-text-muted" />
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute z-10 w-full mt-1 max-h-48 overflow-auto rounded bg-theme-surface py-1 text-sm shadow-lg border border-theme-border">
          {filteredPlayers.length === 0 && query !== '' ? (
            <div className="px-2 py-1 text-theme-text-muted">Nothing found.</div>
          ) : (
            filteredPlayers.map((player) => (
              <Combobox.Option
                key={player}
                value={player}
                className={({ active }) =>
                  `px-2 py-1 cursor-pointer dropdown-option ${
                    active ? 'bg-theme-highlight text-theme-highlight-text' : 'text-theme-text'
                  }`
                }
              >
                {player}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default PlayerSelector;
