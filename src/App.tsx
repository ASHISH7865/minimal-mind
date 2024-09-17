
import { Container, SxProps, Typography } from '@mui/material'
import './App.css'
import MainScreen from './components/screen/MainScreen'

const BoxStyle: SxProps = {
    display: 'flex',
    marginTop: "50px",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

function App() {
    return (
        <Container component={"section"} maxWidth="sm" sx={BoxStyle}>
            <MainScreen />
            <Typography sx={{ position: 'fixed', bottom: 0, left: '50%', padding: "10px", transform: 'translateX(-50%)', fontSize: '0.8rem', color: 'text.secondary', background: "#121212" , width: "100%" , textAlign: "center" }}>
                created by <a href="https://github.com/ASHISH7865" style={{ color: 'inherit' }}>ASHISH7865</a> with ❤️
            </Typography>
        </Container>
    )
}

export default App
