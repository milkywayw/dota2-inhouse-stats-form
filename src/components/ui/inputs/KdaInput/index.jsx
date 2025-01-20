import { useRef } from 'react';

const KDAInput = ({ kills, deaths, assists, onChange, touched, errors = {} }) => {
  const deathsRef = useRef(null);
  const assistsRef = useRef(null);

  const handleChange = (type) => (e) => {
    let value = e.target.value;

    // Handle empty or invalid input
    if (value === '') {
      onChange({ kills, deaths, assists, [type]: '' });
      return;
    }

    // Convert to number and validate
    const numValue = parseInt(value, 10);

    // Ensure the value is between 0 and 99
    if (numValue < 0) value = '0';
    if (numValue > 99) value = '99';

    // Remove leading zeros
    value = value.replace(/^0+/, '') || '0';

    onChange({ kills, deaths, assists, [type]: value });
  };

  const handleKeyPress = (nextRef) => (e) => {
    // Prevent negative signs
    if (e.key === '-') {
      e.preventDefault();
      return;
    }

    // Handle forward slash for quick navigation
    if (e.key === '/') {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  const handleBeforeInput = (e) => {
    const currentValue = e.target.value;
    const newValue = currentValue + e.data;

    // Prevent input if it would result in more than 2 digits
    if (newValue.length > 2 && !newValue.includes('-')) {
      e.preventDefault();
    }
  };

  const inputClasses = (type) => `
    w-16 
    px-2 
    py-1 
    rounded 
    border 
    transition-colors
    ${touched && errors[type] ? 'border-theme-error' : 'border-theme-border'}
  `;

  // Convert empty string to empty string for display
  const formatValue = (value) => (value === '' ? '' : value);

  return (
    <div className="flex items-center">
      <input
        type="number"
        min="0"
        max="99"
        placeholder="K"
        value={formatValue(kills)}
        onChange={handleChange('kills')}
        onKeyPress={handleKeyPress(deathsRef)}
        onBeforeInput={handleBeforeInput}
        className={inputClasses('kills')}
      />
      <span className="mx-1 text-theme-text-muted">/</span>
      <input
        ref={deathsRef}
        type="number"
        min="0"
        max="99"
        placeholder="D"
        value={formatValue(deaths)}
        onChange={handleChange('deaths')}
        onKeyPress={handleKeyPress(assistsRef)}
        onBeforeInput={handleBeforeInput}
        className={inputClasses('deaths')}
      />
      <span className="mx-1 text-theme-text-muted">/</span>
      <input
        ref={assistsRef}
        type="number"
        min="0"
        max="99"
        placeholder="A"
        value={formatValue(assists)}
        onChange={handleChange('assists')}
        onBeforeInput={handleBeforeInput}
        className={inputClasses('assists')}
      />
    </div>
  );
};

export default KDAInput;
