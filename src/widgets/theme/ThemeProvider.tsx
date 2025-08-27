import React, { createContext, ReactNode, useEffect, useState } from 'react';
import styles from '../../app/theme.module.css';

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export interface IThemeContextProviderProps {
  theme: Theme;
  handleSwitchTheme?: () => void;
}
export const ThemeContext = createContext<IThemeContextProviderProps>({} as IThemeContextProviderProps);

interface IThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [styleName, setStyleName] = useState(theme);
  const handleSwitchTheme = () => {
    setTheme((prev) => (prev === Theme.light ? Theme.dark : Theme.light));
  };

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    setStyleName(theme === Theme.light ? styles.light : styles.dark);
  }, [theme]);

  return (
    <div className={styleName} style={{ height: '100vh' }}>
      <ThemeContext.Provider value={{ theme, handleSwitchTheme }}>{children}</ThemeContext.Provider>
    </div>
  );
};

export default ThemeProvider;
