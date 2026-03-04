import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('blue');

  useEffect(() => {
    const saved = localStorage.getItem('themePreferences');
    if (saved) {
      const prefs = JSON.parse(saved);
      setThemeMode(prefs.themeMode || 'light');
      setPrimaryColor(prefs.primaryColor || 'blue');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themePreferences', JSON.stringify({
      themeMode,
      primaryColor
    }));
  }, [themeMode, primaryColor]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, primaryColor, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
}