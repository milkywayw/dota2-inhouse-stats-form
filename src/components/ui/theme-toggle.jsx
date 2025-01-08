import React from 'react';
import { Sparkles } from 'lucide-react';

const ThemeToggle = () => {
  const themes = ['light', 'dark', 'solarized', 'melange', 'vaporwave', 'tokyo-night'];

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    html.setAttribute('data-theme', themes[nextIndex]);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full border border-theme-border bg-theme-surface text-theme-text hover:bg-theme-surface-secondary theme-toggle-button"
    >
      <Sparkles className="w-5 h-5" />
    </button>
  );
};

export default ThemeToggle;
