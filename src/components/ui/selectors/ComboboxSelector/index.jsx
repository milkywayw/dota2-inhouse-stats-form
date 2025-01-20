import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronDown, Plus, X } from 'lucide-react';
import { useComboboxSearch } from '../../../../hooks/useComboboxSearch';

const ComboboxSelector = ({
  id,
  selectedItem,
  onChange,
  availableItems,
  placeholder,
  disabled = false,
  error = false,
  renderSelectedItem,
  renderOption,
  allowAddNew = false,
}) => {
  const { query, setQuery, filteredItems } = useComboboxSearch(availableItems);
  const [newlyAddedItems, setNewlyAddedItems] = useState(new Set());
  const inputId = id || Math.random().toString(36).substr(2, 9);

  // Check for exact match (case insensitive)
  const hasExactMatch =
    query !== '' && availableItems.some((item) => item.toLowerCase() === query.toLowerCase());

  // Reset states when selectedItem changes to null
  useEffect(() => {
    if (selectedItem === null) {
      setQuery('');
    }
  }, [selectedItem, setQuery]);

  const handleAddNew = (value) => {
    const newValue = value || query.trim();
    if (newValue) {
      setNewlyAddedItems((prev) => new Set(prev).add(newValue));
      setQuery('');
      onChange(newValue);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
    setQuery('');
    // Focus the input after a short delay to ensure it exists
    setTimeout(() => {
      const input = document.querySelector(`#${inputId}`);
      if (input) {
        input.focus();
      }
    }, 0);
  };

  const isNewlyAdded = (item) => newlyAddedItems.has(item);

  // Create special "Add new" option value
  const getAddNewOption = () => {
    const value = query.trim();
    return {
      id: '__add_new__',
      value: value || 'new_player',
      label: value ? `Add "${value}"` : 'Add new player...',
      isNew: true,
    };
  };

  return (
    <div className="relative">
      <div
        className={`flex rounded overflow-hidden border transition-colors ${
          error ? 'border-theme-error' : 'border-theme-border'
        }`}
      >
        <Combobox
          value={selectedItem}
          onChange={(value) => {
            if (typeof value === 'object' && value?.isNew) {
              handleAddNew(value.value);
            } else {
              onChange(value);
            }
          }}
          disabled={disabled}
          nullable
        >
          <div className="flex items-center flex-1 bg-theme-surface">
            {selectedItem ? (
              <div className="flex-1 px-2 py-1">
                <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-theme-surface-secondary text-theme-text gap-2 whitespace-nowrap text-sm">
                  {renderSelectedItem(selectedItem)}
                  <span className={isNewlyAdded(selectedItem) ? 'italic' : ''}>{selectedItem}</span>
                  <button onClick={handleClear} className="hover:text-theme-error ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center">
                <Combobox.Input
                  id={inputId}
                  className="w-full px-2 py-1 text-sm border-none focus:ring-0 combobox-input text-theme-text placeholder-theme-text-muted"
                  onChange={(event) => setQuery(event.target.value)}
                  displayValue={(item) => (typeof item === 'string' ? item : '')}
                  placeholder={placeholder}
                />
                <Combobox.Button className="h-full px-2">
                  <ChevronDown className="h-4 w-4 text-theme-text-muted" />
                </Combobox.Button>
              </div>
            )}
          </div>
          <Combobox.Options className="absolute z-10 w-full mt-1 max-h-48 overflow-auto rounded bg-theme-surface py-1 text-sm shadow-lg border border-theme-border top-full">
            {filteredItems.map((item) => (
              <Combobox.Option
                key={item}
                value={item}
                className={`px-2 py-1 cursor-pointer dropdown-option`}
              >
                {({ active }) => (
                  <div
                    className={`${
                      active ? 'bg-theme-highlight text-theme-highlight-text' : 'text-theme-text'
                    } px-2 py-0.5 rounded-full bg-theme-surface-secondary inline-flex items-center gap-2 max-w-full`}
                  >
                    {renderOption(item, active)}
                  </div>
                )}
              </Combobox.Option>
            ))}
            {filteredItems.length === 0 && query !== '' && !allowAddNew && (
              <div className="px-2 py-1 text-theme-text-muted">Nothing found.</div>
            )}
            {allowAddNew && !hasExactMatch && (
              <Combobox.Option
                value={getAddNewOption()}
                className={`w-full border-t border-theme-border cursor-pointer`}
              >
                {({ active }) => (
                  <div
                    className={`px-2 py-1 flex items-center gap-2 ${
                      active
                        ? 'bg-theme-highlight text-theme-highlight-text'
                        : 'text-theme-text-muted'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    <span className={query.trim() === '' ? 'italic' : ''}>
                      {query.trim() ? `Add "${query.trim()}"` : 'Add new player...'}
                    </span>
                  </div>
                )}
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Combobox>
      </div>
    </div>
  );
};

export default ComboboxSelector;
