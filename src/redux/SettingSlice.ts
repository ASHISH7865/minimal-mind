import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeType = "dark" | 'light' | "redVelvet" | 'gruvbox';

interface SettingsState {
    isSettingsOpen: boolean;
    isDarkMode: boolean;
    theme: ThemeType;
    fontScale : { label : string , value : number  , scale : number};
}

const initialState: SettingsState = {
    isSettingsOpen: false,
    isDarkMode: true, // Assuming dark mode is enabled by default
    theme: 'dark',
    fontScale : {label : "md" , value : 50 , scale : 1}
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleSettingsModal: (state) => {
            state.isSettingsOpen = !state.isSettingsOpen;
        },
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
        setTheme: (state, action: PayloadAction<'dark' | 'light' | 'redVelvet' | 'gruvbox'>) => {
            state.theme = action.payload;
        },
        setFontScale: (state, action: PayloadAction<{ label: string; value: number , scale : number }>) => {
            state.fontScale = action.payload;
        },
    },
});

export const { toggleSettingsModal, toggleDarkMode, setTheme , setFontScale } = settingsSlice.actions;
export default settingsSlice.reducer;
