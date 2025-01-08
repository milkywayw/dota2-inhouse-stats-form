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
          className={`flex bg-white rounded overflow-hidden border transition-colors ${
            error ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center flex-1">
            {selectedHero && (
              <img
                src={getHeroImagePath(selectedHero, 'small')}
                alt={selectedHero}
                className="w-8 h-4.5 object-cover ml-1" // 16:9 ratio maintained
              />
            )}
            <Combobox.Input
              className="w-full px-2 py-1 text-sm border-none focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(hero) => hero}
              placeholder={placeholder}
            />
          </div>
          <Combobox.Button className="px-2 bg-gray-50 border-l border-gray-200">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute z-10 w-full mt-1 max-h-48 overflow-auto rounded bg-white py-1 text-sm shadow-lg border border-gray-200">
          {filteredHeroes.length === 0 && query !== '' ? (
            <div className="px-2 py-1 text-gray-500">Nothing found.</div>
          ) : (
            filteredHeroes.map((hero) => (
              <Combobox.Option
                key={hero}
                value={hero}
                className={({ active }) =>
                  `px-2 py-1 cursor-pointer ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}`
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
