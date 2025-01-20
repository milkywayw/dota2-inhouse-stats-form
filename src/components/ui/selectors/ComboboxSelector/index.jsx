import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronDown, Plus } from 'lucide-react';
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
  allowAddNew = false,
}) => {
  const { query, setQuery, filteredItems } = useComboboxSearch(availableItems);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');

  // Reset states when selectedItem changes
  useEffect(() => {
    if (selectedItem === null) {
      setQuery('');
      setIsAddingNew(false);
      setNewItemValue('');
    }
  }, [selectedItem, setQuery]);

  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setNewItemValue(query);
  };

  const handleNewItemSubmit = (e) => {
    e.preventDefault();
    if (newItemValue.trim()) {
      onChange(newItemValue.trim());
      setIsAddingNew(false);
      setNewItemValue('');
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex rounded overflow-hidden border transition-colors ${
          error ? 'border-theme-error' : 'border-theme-border'
        }`}
      >
        {isAddingNew ? (
          <form onSubmit={handleNewItemSubmit} className="flex flex-1">
            <input
              autoFocus
              type="text"
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              onBlur={() => {
                if (!newItemValue.trim()) {
                  setIsAddingNew(false);
                }
              }}
              className="w-full px-2 py-1 text-sm border-none focus:ring-0 combobox-input text-theme-text"
              placeholder="Enter new name..."
            />
            <button
              type="submit"
              className="px-2 bg-theme-surface-secondary border-l border-theme-border hover:bg-theme-primary hover:text-theme-primary-text"
            >
              <Plus className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <Combobox value={selectedItem} onChange={onChange} disabled={disabled}>
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
            <Combobox.Options className="absolute z-10 w-full mt-1 max-h-48 overflow-auto rounded bg-theme-surface py-1 text-sm shadow-lg border border-theme-border">
              {filteredItems.map((item) => (
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
              ))}
              {allowAddNew && (
                <button
                  onClick={handleAddNewClick}
                  className="w-full px-2 py-1 text-left border-t border-theme-border text-theme-text-muted hover:bg-theme-highlight hover:text-theme-highlight-text flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span className="italic">Add new player...</span>
                </button>
              )}
            </Combobox.Options>
          </Combobox>
        )}
      </div>
    </div>
  );
};

export default ComboboxSelector;
