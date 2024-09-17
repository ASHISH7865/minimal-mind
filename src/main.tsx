import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import theme from './theme.tsx'
import { CssBaseline } from '@mui/material'
import { TodoProvider } from './components/providers/TodoProvider.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TodoProvider>
                <App />
            </TodoProvider>
        </ThemeProvider>
    </StrictMode>,
)
