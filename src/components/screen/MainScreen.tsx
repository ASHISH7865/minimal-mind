import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTodo } from "../providers/TodoProvider";
import TaskCard from "../ui/TaskCard";
import { X, List } from "lucide-react"; // Add List icon
import { motion } from "framer-motion";

const MainScreen: React.FC = () => {
    const { todos, addTodo, clearCompleted , addBulkTodo , clearAll } = useTodo();
    const [newTodo, setNewTodo] = useState('');
    const [initialLoad, setInitialLoad] = useState(true);
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [bulkTodos, setBulkTodos] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoad(false);
        }, todos.length * 100); // Reduced time for better UX

        return () => clearTimeout(timer);
    }, [todos.length]); // Added dependency

    const handleAddTodo = useCallback(() => {
        if (isBulkMode) {
            const tasks = bulkTodos.split('\n').filter(task => task.trim() !== '');
            console.log("isBulkMode", tasks);
            addBulkTodo(tasks);
            setBulkTodos('');
        } else {
            if (newTodo.trim() !== '') {
                addTodo(newTodo.trim());
                setNewTodo('');
            }
        }
    }, [isBulkMode, bulkTodos, newTodo, addTodo , addBulkTodo]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isBulkMode) {
            handleAddTodo();
        }
    }, [handleAddTodo, isBulkMode]);

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
                alignItems: "center",
                width: "100%",
                paddingBottom: "50px",
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%" }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <Typography variant="h4" component="h1">
                        Minimal Mind
                    </Typography>
                </Box>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Typography variant="body2" component="p" color="secondary">Minimal Input, Maximum Output</Typography>
                </Box>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    sx={{
                        alignSelf: "flex-start",
                    }}
                >
                    <Box sx={{ width: '100%', mt: "20px", display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                        <Typography variant="body2" component="span" sx={{ fontSize: { xs: 10, md: 12 }, color: 'text.secondary' }}>
                            {todos.length} total
                        </Typography>
                        <Typography variant="body2" component="span" sx={{ fontSize: { xs: 10, md: 12 }, color: 'success.light' }}>
                            {completedCount} done
                        </Typography>
                        <Typography variant="body2" component="span" sx={{ fontSize: { xs: 10, md: 12 }, color: 'warning.light' }}>
                            {pendingCount} pending
                        </Typography>
                    </Box>
                </Box>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    sx={{
                        alignSelf: "flex-start",
                        mt: '25px',
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    <Button
                        onClick={clearCompleted}
                        sx={{
                            fontSize: { xs: 10, md: 12 },
                        }}
                        disabled={!hasCompletedTodos}
                        variant="contained"
                        color="secondary"
                        startIcon={<X size={12} />}
                    >
                        Clear Completed
                    </Button>
                    <Button
                        onClick={clearAll}
                        sx={{
                            fontSize: { xs: 10, md: 12 },
                        }}
                        variant="contained"
                        disabled={todos.length === 0}
                        color="secondary"
                        startIcon={<X size={12} />}
                    >
                        Clear All
                    </Button>

                </Box>

                <Box sx={{ my: 2, alignSelf: "flex-start", width: "100%" , display: "flex", flexDirection: "column", gap: 2  }}>
                    {todos.map((todo, index) => (
                        <Box
                            component={motion.div}
                            key={todo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: initialLoad ? 1 + index * 0.1 : 0, duration: 0.3 }}
                        >
                            <TaskCard id={todo.id} title={todo.title} status={todo.status} />
                        </Box>
                    ))}
                </Box>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    sx={{
                        alignSelf: "flex-start",
                        width: '100%',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Button
                            onClick={() => setIsBulkMode(!isBulkMode)}
                            sx={{ mr: 2 }}
                            variant="outlined"
                            color="secondary"
                            startIcon={<List size={16} />}
                        >
                            {isBulkMode ? 'Single Mode' : 'Bulk Mode'}
                        </Button>
                        {isBulkMode && (
                            <Button
                                onClick={handleAddTodo}
                                variant="contained"
                                color="primary"
                            >
                                Add Tasks
                            </Button>
                        )}
                    </Box>
                    <Box sx={{ mb: 2, mx: 1, width: '100%' }}>
                        {isBulkMode ? (
                            <TextField
                                fullWidth
                                multiline
                                size="small"
                                rows={4}
                                value={bulkTodos}
                                onChange={(e) => setBulkTodos(e.target.value)}
                                placeholder="Enter multiple tasks, one per line"
                                variant="standard"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                        ) : (
                            <TextField
                                fullWidth
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="+ add task & press enter"
                                variant="standard"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(MainScreen);
