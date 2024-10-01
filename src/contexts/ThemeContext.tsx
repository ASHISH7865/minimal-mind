import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setTheme, ThemeType } from '../redux/SettingSlice';
import { darkTheme, lightTheme, redVelvetTheme, gruvboxTheme } from '../theme';

interface ThemeContextType {
  currentTheme: Theme;
  changeTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const currentThemeName = useSelector((state: RootState) => state.settings.theme);

  const currentTheme = useMemo(() => {
    let theme  = lightTheme;
    switch (currentThemeName) {
        case 'dark':
          theme = darkTheme;
          break;
        case 'redVelvet':
          theme = redVelvetTheme;
          break;
        case 'gruvbox':
          theme = gruvboxTheme;
          break;
      }
      return theme
  }, [currentThemeName]);

  const changeTheme = (theme: ThemeType) => {
    dispatch(setTheme(theme));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      <MuiThemeProvider theme={currentTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
