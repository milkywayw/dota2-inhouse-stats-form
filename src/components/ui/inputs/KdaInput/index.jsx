import React, { useRef } from 'react';

const KDAInput = ({ kills, deaths, assists, onChange, touched, errors = {} }) => {
  const deathsRef = useRef(null);
  const assistsRef = useRef(null);

  const handleChange = (type) => (e) => {
    const value = e.target.value;
    onChange({ kills, deaths, assists, [type]: value });
  };

  const handleKeyPress = (nextRef) => (e) => {
    if (e.key === '/') {
      e.preventDefault(); // Prevent the '/' from being typed
      nextRef.current?.focus();
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

  return (
    <div className="flex items-center">
      <input
        type="number"
        min="0"
        placeholder="K"
        value={kills}
        onChange={handleChange('kills')}
        onKeyPress={handleKeyPress(deathsRef)}
        className={inputClasses('kills')}
      />
      <span className="mx-1 text-theme-text-muted">/</span>
      <input
        ref={deathsRef}
        type="number"
        min="0"
        placeholder="D"
        value={deaths}
        onChange={handleChange('deaths')}
        onKeyPress={handleKeyPress(assistsRef)}
        className={inputClasses('deaths')}
      />
      <span className="mx-1 text-theme-text-muted">/</span>
      <input
        ref={assistsRef}
        type="number"
        min="0"
        placeholder="A"
        value={assists}
        onChange={handleChange('assists')}
        className={inputClasses('assists')}
      />
    </div>
  );
};

export default KDAInput;
