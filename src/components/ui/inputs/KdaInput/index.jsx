import React from 'react';

const KDAInput = ({ kills, deaths, assists, onChange, touched, errors = {} }) => {
  const handleChange = (type) => (e) => {
    const value = e.target.value;
    onChange({ kills, deaths, assists, [type]: value });
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
        className={inputClasses('kills')}
      />
      <span className="mx-1 text-theme-text-muted">/</span>
      <input
        type="number"
        min="0"
        placeholder="D"
        value={deaths}
        onChange={handleChange('deaths')}
        className={inputClasses('deaths')}
      />
      <span className="mx-1 text-theme-text-muted">/</span>
      <input
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
