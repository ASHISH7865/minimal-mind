import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
    },
    secondary: {
      main: '#757575',
    },
    divider: '#303030',
  },
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
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#bdbdbd',
          '&.Mui-checked': {
            color: '#bdbdbd',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
          color: '#e0e0e0',
          border: '1px solid #bdbdbd',
          '&.MuiChip-clickable:hover': {
            backgroundColor: '#bdbdbd',
            color: '#1e1e1e',
          },
        },
        deleteIcon: {
          color: '#e0e0e0',
          '&:hover': {
            color: '#a0a0a0',
          },
        },
      },
    },
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
        contained: {
          backgroundColor: '#bdbdbd',
          color: '#121212',
          '&:hover': {
            backgroundColor: '#9e9e9e',
          },
        },
        outlined: {
          borderColor: '#bdbdbd',
          color: '#bdbdbd',
          '&:hover': {
            backgroundColor: 'rgba(189, 189, 189, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#424242',
            },
            '&:hover fieldset': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#bdbdbd',
            },
          },
          '& .MuiInputBase-root': {
            fontSize: '0.875rem',
            '@media (min-width:600px)': {
              fontSize: '1rem',
            },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: '#757575',
          '&.Mui-checked': {
            color: '#bdbdbd',
          },
        },
        track: {
          backgroundColor: '#424242',
          '.Mui-checked.Mui-checked + &': {
            backgroundColor: '#9e9e9e',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#bdbdbd',
        },
        rail: {
          backgroundColor: '#424242',
        },
      },
    },
  },
});

export default theme;
