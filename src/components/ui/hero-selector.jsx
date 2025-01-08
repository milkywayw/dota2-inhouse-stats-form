import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { getHeroImagePath } from '../../utils/hero-utils';

const HeroSelector = ({
  selectedHero,
  onChange,
  availableHeroes,
  placeholder = 'Select hero...',
  disabled = false,
  error = false,
}) => {
  const [query, setQuery] = useState('');

  const filteredHeroes =
    query === ''
      ? availableHeroes
      : availableHeroes.filter((hero) => hero.toLowerCase().includes(query.toLowerCase()));

  return (
    <Combobox value={selectedHero} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <div
          className={`flex rounded overflow-hidden border transition-colors ${
            error ? 'border-theme-error' : 'border-theme-border'
          }`}
        >
          <div className="flex items-center flex-1 bg-theme-surface">
            {selectedHero && (
              <img
                src={getHeroImagePath(selectedHero, 'small')}
                alt={selectedHero}
                className="w-8 h-4.5 object-cover ml-1" // 16:9 ratio maintained
              />
            )}
            <Combobox.Input
              className="w-full px-2 py-1 text-sm border-none focus:ring-0 combobox-input text-theme-text placeholder-theme-text-muted"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(hero) => hero}
              placeholder={placeholder}
            />
          </div>
          <Combobox.Button className="px-2 bg-theme-surface-secondary border-l border-theme-border">
            <ChevronDown className="h-4 w-4 text-theme-text-muted" />
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute z-10 w-full mt-1 max-h-48 overflow-auto rounded bg-theme-surface py-1 text-sm shadow-lg border border-theme-border">
          {filteredHeroes.length === 0 && query !== '' ? (
            <div className="px-2 py-1 text-theme-text-muted">Nothing found.</div>
          ) : (
            filteredHeroes.map((hero) => (
              <Combobox.Option
                key={hero}
                value={hero}
                className={({ active }) =>
                  `px-2 py-1 cursor-pointer dropdown-option ${
                    active ? 'bg-theme-highlight text-theme-highlight-text' : 'text-theme-text'
                  }`
                }
              >
                {({ active }) => (
                  <div className="flex items-center gap-2">
                    <img
                      src={getHeroImagePath(hero, 'small')}
                      alt={hero}
                      className="w-6 h-3.5 object-cover" // 16:9 ratio maintained
                    />
                    <span>{hero}</span>
                  </div>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default HeroSelector;
