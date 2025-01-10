import React from 'react';
import MatchForm from './components/MatchForm/index';
import './themes/color-schemes.css';
import './styles/utils.css';
import ThemeToggle from './components/ui/theme-toggle';

function App() {
  return (
    <div className="min-h-screen bg-theme-surface text-theme-text transition-colors">
      <ThemeToggle />
      <MatchForm />
    </div>
  );
}

export default App;
