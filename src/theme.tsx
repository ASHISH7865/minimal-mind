import { createTheme } from '@mui/material/styles';

const baseTheme = {
  typography: {
    fontFamily: 'JetBrains Mono, monospace',
    h4: {
      fontSize: '1.75rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
    body1: {
      fontSize: '0.875rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
    body2: {
      fontSize: '0.75rem',
      '@media (min-width:600px)': {
        fontSize: '0.875rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          '@media (min-width:600px)': {
            fontSize: '0.875rem',
          },
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            fontSize: '0.875rem',
            '@media (min-width:600px)': {
              fontSize: '1rem',
            },
          },
        },
      },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCustomTheme = (options : any) => {
  const { palette, components } = options;
  return createTheme({
    ...baseTheme,
    palette,
    components: {
      ...baseTheme.components,
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: palette.primary.main,
            '&.Mui-checked': {
              color: palette.primary.main,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background.default,
            color: palette.text.primary,
            border: `1px solid ${palette.primary.main}`,
            '&.MuiChip-clickable:hover': {
              backgroundColor: palette.primary.main,
              color: palette.background.default,
            },
          },
          deleteIcon: {
            color: palette.text.primary,
            '&:hover': {
              color: palette.text.secondary,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          ...baseTheme.components.MuiButton.styleOverrides,
          contained: {
            backgroundColor: palette.primary.main,
            color: palette.background.default,
            '&:hover': {
              backgroundColor: palette.primary.dark,
            },
          },
          outlined: {
            borderColor: palette.primary.main,
            color: palette.primary.main,
            '&:hover': {
              backgroundColor: `${palette.primary.main}14`,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            ...baseTheme.components.MuiTextField.styleOverrides.root,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: palette.primary.main,
              },
              '&:hover fieldset': {
                borderColor: palette.primary.dark,
              },
              '&.Mui-focused fieldset': {
                borderColor: palette.primary.dark,
              },
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: palette.secondary.main,
            '&.Mui-checked': {
              color: palette.primary.main,
            },
          },
          track: {
            backgroundColor: palette.divider,
            '.Mui-checked.Mui-checked + &': {
              backgroundColor: palette.primary.main,
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            color: palette.primary.main,
          },
          rail: {
            backgroundColor: palette.divider,
          },
        },
      },
      ...components,
    },
  });
};

export const darkTheme = createCustomTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0',
    },
    primary: {
      main: '#bdbdbd',
      dark: '#9e9e9e',
    },
    secondary: {
      main: '#757575',
    },
    divider: '#303030',
  },
});

export const lightTheme = createCustomTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
    primary: {
      main: '#1976d2',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    divider: '#e0e0e0',
  },
});

export const redVelvetTheme = createCustomTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffebee',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
    primary: {
      main: '#d32f2f',
      dark: '#c62828',
    },
    secondary: {
      main: '#f44336',
    },
    divider: '#e0e0e0',
  },
});

export const gruvboxTheme = createCustomTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#282828',
      paper: '#3c3836',
    },
    text: {
      primary: '#ebdbb2',
      secondary: '#a89984',
    },
    primary: {
      main: '#d79921',
      dark: '#b16286',
    },
    secondary: {
      main: '#b16286',
    },
    divider: '#504945',
  },
});
