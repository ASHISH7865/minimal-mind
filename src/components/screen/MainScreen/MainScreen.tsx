import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addTodo, clearCompleted, clearAll, toggleZenMode, Todo } from '../../../redux/todoSlice';
import Header from './Header';
import Statistics from './Statistics';
import ActionButtons from './ActionButtons';
import TaskList from './TaskList';
import TodoInput from './TodoInput';
import SettingsDrawer from '../../ui/SettingModal';
import TaskPriorityDrawer from '../../ui/TaskPriorityDrawer'; // Import the new drawer
import { toggleSettingsModal } from '../../../redux/SettingSlice';

const MainScreen: React.FC = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const isZenMode = useSelector((state: RootState) => state.todos.isZenMode);
    const [newTodo, setNewTodo] = useState<Todo | null>(null);
    const [initialLoad, setInitialLoad] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentEditTask , setCurrentEditTask] = useState<Todo | null>(null);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            const parsedTodos: Todo[] = JSON.parse(storedTodos);
            parsedTodos.forEach(todo => {
                dispatch(addTodo(todo));
            });
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

        if (newTodo) {
            dispatch(addTodo(newTodo));
        }
        setNewTodo(null); // This line resets the newTodo state
    };

    const hasCompletedTodos = todos.some(todo => todo.status === 'COMPLETED');
    const completedCount = todos.filter(todo => todo.status === 'COMPLETED').length;
    const pendingCount = todos.length - completedCount;

    const handleEditTask = (id: string) => {
       const currentTask = todos.find((todo) => todo.id === id);
       if(currentTask) setCurrentEditTask(currentTask);
        setDrawerOpen(true);
    };

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
            <TaskList todos={todos} initialLoad={initialLoad} onEditTask={handleEditTask} />
            {!isZenMode && <TodoInput
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                handleAddTodo={handleAddTodo}
            />}
            <SettingsDrawer />
           {currentEditTask && <TaskPriorityDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                task={currentEditTask}

            />}
        </Box>
    );
};

export default MainScreen;
