import React from 'react';
import { Box, Card, CardActionArea, CardContent, Divider, Typography, Drawer, Radio } from '@mui/material';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleSettingsModal, setTheme  } from '../../redux/SettingSlice';

const themeOptions = [
    { value: 'dark' as const, label: 'Dark', background: '#121212', textColor: '#e0e0e0' },
    { value: 'light' as const, label: 'Light', background: '#ffffff', textColor: '#000000' },
    { value: 'redVelvet' as const, label: 'Red Velvet', background: '#ffebee', textColor: '#d32f2f' },
    { value: 'gruvbox' as const, label: 'Gruvbox', background: '#282828', textColor: '#ebdbb2' },
];



const SettingModal: React.FC = () => {
    const { changeTheme } = useThemeContext();
    const dispatch = useDispatch();
    const isSettingsOpen = useSelector((state: RootState) => state.settings.isSettingsOpen);
    const currentTheme = useSelector((state: RootState) => state.settings.theme);

    const handleClose = () => {
        dispatch(toggleSettingsModal());
    };

    const handleThemeChange = (theme: 'dark' | 'light' | 'redVelvet' | 'gruvbox') => {
        changeTheme(theme);
        dispatch(setTheme(theme));
    };


    return (
        <Drawer anchor="right" open={isSettingsOpen} onClose={handleClose}>
            <Box sx={{ width: 300, p: 2 }}>
                <Box >
                    <Typography variant="h6" component="div">General</Typography>
                    <Box sx={{ p: 2 }}>
                        {/* Add general settings here */}
                    </Box>
                </Box>
                <Divider />
                <Box>
                    <Typography variant="h6" component="div">Appearance</Typography>
                    <Box sx={{ p: 2 }}>
                        <Typography component={"h3"}>Theme</Typography>
                        <Box sx={{ p: 2, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            {themeOptions.map((option) => (
                                <Box key={option.value} sx={{ display: "flex", flexDirection: "column", alignItems: 'center', width: "100%", height: "100%" }}>
                                    <Card sx={{ background: option.background, minHeight: 80, width: "100%", height: "100%" }}>
                                        <CardActionArea onClick={() => handleThemeChange(option.value)} sx={{ width: "100%", height: "100%" }}>
                                            <CardContent>
                                                <Typography variant="h6" component="div" sx={{ color: option.textColor, fontSize: "12px", textAlign: 'center' }}>
                                                    {option.label}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                                        <Radio
                                            checked={currentTheme === option.value}
                                            onChange={() => handleThemeChange(option.value)}
                                            value={option.value}
                                            name="theme-radio"
                                            inputProps={{ 'aria-label': option.label }}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SettingModal;
