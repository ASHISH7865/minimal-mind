import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addTodo, addBulkTodo, clearCompleted, clearAll, toggleZenMode } from '../../../redux/todoSlice';
import Header from './Header';
import Statistics from './Statistics';
import ActionButtons from './ActionButtons';
import TaskList from './TaskList';
import TodoInput from './TodoInput';
import SettingsDrawer from '../../ui/SettingModal';
import { toggleSettingsModal } from '../../../redux/SettingSlice';


const MainScreen: React.FC = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const isZenMode = useSelector((state: RootState) => state.todos.isZenMode);
    const [newTodo, setNewTodo] = useState('');
    const [initialLoad, setInitialLoad] = useState(true);
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [bulkTodos, setBulkTodos] = useState('');

    useEffect(() => {
        // Load todos from local storage on initial load
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            const parsedTodos = JSON.parse(storedTodos);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            parsedTodos.forEach((todo: any) => dispatch(addTodo(todo.title))); // Adjust as needed
        }
        setInitialLoad(false);
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'z') {
                event.preventDefault();
                dispatch(toggleZenMode());
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (isBulkMode) {
            const titles = bulkTodos.split('\n').filter(title => title.trim() !== '');
            dispatch(addBulkTodo(titles));
            setBulkTodos('');
        } else {
            dispatch(addTodo(newTodo));
            setNewTodo('');
        }
    };

    const hasCompletedTodos = todos.some(todo => todo.status === 'COMPLETED');
    const completedCount = todos.filter(todo => todo.status === 'COMPLETED').length;
    const pendingCount = todos.length - completedCount;

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                paddingBottom: '50px',
            }}
        >
            {!isZenMode && <Header />}
            {!isZenMode && <Statistics total={todos.length} completed={completedCount} pending={pendingCount} />}
            <ActionButtons
                clearCompleted={() => dispatch(clearCompleted())}
                clearAll={() => dispatch(clearAll())}
                hasCompletedTodos={hasCompletedTodos}
                hasTodos={todos.length > 0}
                toggleZenMode={() => dispatch(toggleZenMode())}
                isZenMode={isZenMode}
                handleSettingsOpen={() => dispatch(toggleSettingsModal())}
            />
            <Divider sx={{ width: '100%', mt: 2 }} />
            <TaskList todos={todos} initialLoad={initialLoad} />
            {!isZenMode && <TodoInput
                isBulkMode={isBulkMode}
                bulkTodos={bulkTodos}
                newTodo={newTodo}
                setBulkTodos={setBulkTodos}
                setNewTodo={setNewTodo}
                handleAddTodo={handleAddTodo}
                setIsBulkMode={setIsBulkMode}
            />}
            {/* All Modals */}
            <SettingsDrawer />
        </Box>
    );
};

export default MainScreen;
