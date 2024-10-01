// src/components/ui/TodoInput.tsx
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface TodoInputProps {
    isBulkMode: boolean;
    bulkTodos: string;
    newTodo: string;
    setBulkTodos: (value: string) => void;
    setNewTodo: (value: string) => void;
    handleAddTodo: () => void;
    setIsBulkMode: (value: boolean) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({
    isBulkMode, bulkTodos, newTodo, setBulkTodos, setNewTodo, handleAddTodo, setIsBulkMode
}) => (
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
        <Box sx={{ position: 'relative', mb: 2, mx: 1, width: '100%' }}>
            <Typography
                variant="caption"
                sx={{
                    position: '',
                    right: 0,
                    bottom: -20,
                    color: 'text.secondary',
                    fontSize: '0.7rem',
                }}
            >
                {isBulkMode ? 'Bulk Mode' : 'Single Mode'} (Shift+Tab to switch)
            </Typography>
            <TextField
                fullWidth
                multiline={isBulkMode}
                rows={isBulkMode ? 4 : 1}
                value={isBulkMode ? bulkTodos : newTodo}
                onChange={(e) => isBulkMode ? setBulkTodos(e.target.value) : setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddTodo();
                    } else if (e.key === 'Tab' && e.shiftKey) {
                        e.preventDefault();
                        setIsBulkMode(!isBulkMode);
                    }
                }}
                placeholder={isBulkMode ? "Enter multiple tasks, one per line" : "+ Add task & press enter"}
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                }}
            />
        </Box>
    </Box>
);

export default TodoInput;
