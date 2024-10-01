import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import settingsReducer from './SettingSlice';

const store = configureStore({
    reducer: {
        todos: todoReducer,
        settings: settingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
