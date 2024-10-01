import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import store from './redux/store';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';

const Main = () => (
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

createRoot(document.getElementById('root')!).render(<Main />);
