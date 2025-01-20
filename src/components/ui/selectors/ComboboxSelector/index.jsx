import { useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useComboboxSearch } from '../../../../hooks/useComboboxSearch';

const ComboboxSelector = ({
  selectedItem,
  onChange,
  availableItems,
  placeholder,
  disabled = false,
  error = false,
  renderSelectedItem,
  renderOption,
}) => {
  const { query, setQuery, filteredItems } = useComboboxSearch(availableItems);

  // Reset query when selectedItem changes to null (form reset)
  useEffect(() => {
    if (selectedItem === null) {
      setQuery('');
    }
  }, [selectedItem, setQuery]);

  return (
    <Combobox value={selectedItem} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <div
          className={`flex rounded overflow-hidden border transition-colors ${
            error ? 'border-theme-error' : 'border-theme-border'
          }`}
        >
          <div className="flex items-center flex-1 bg-theme-surface">
            {selectedItem && renderSelectedItem(selectedItem)}
            <Combobox.Input
              className="w-full px-2 py-1 text-sm border-none focus:ring-0 combobox-input text-theme-text placeholder-theme-text-muted"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(item) => item || ''}
              placeholder={placeholder}
            />
          </div>
          <Combobox.Button className="px-2 bg-theme-surface-secondary border-l border-theme-border">
            <ChevronDown className="h-4 w-4 text-theme-text-muted" />
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute z-10 w-full mt-1 max-h-48 overflow-auto rounded bg-theme-surface py-1 text-sm shadow-lg border border-theme-border">
          {filteredItems.length === 0 && query !== '' ? (
            <div className="px-2 py-1 text-theme-text-muted">Nothing found.</div>
          ) : (
            filteredItems.map((item) => (
              <Combobox.Option
                key={item}
                value={item}
                className={({ active }) =>
                  `px-2 py-1 cursor-pointer dropdown-option ${
                    active ? 'bg-theme-highlight text-theme-highlight-text' : 'text-theme-text'
                  }`
                }
              >
                {({ active }) => renderOption(item, active)}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default ComboboxSelector;
