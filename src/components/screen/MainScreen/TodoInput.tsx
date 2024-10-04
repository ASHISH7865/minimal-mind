// src/components/ui/TodoInput.tsx
import React from "react";
import { Box, Divider, TextField} from "@mui/material";
import { motion } from "framer-motion";
import { Todo } from "../../../redux/todoSlice";
import { nanoid } from "nanoid";

interface TodoInputProps {
    newTodo: Todo | null;
    setNewTodo: (value: Todo | null) => void; // Updated type to allow null
    handleAddTodo: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({
     newTodo, setNewTodo, handleAddTodo
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
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ position: 'relative', my: 2, mx: 1, width: '100%' }}>

            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <TextField
                    fullWidth
                    value={newTodo?.title || ''}
                    onChange={(e) => setNewTodo({ id: nanoid(), title: e.target.value, status: "NOT_COMPLETED", priority: "LOW", tags: [] })} // Update the title only
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddTodo();
                            setNewTodo(null as Todo | null);
                        } else if (e.key === 'Tab') {
                            e.preventDefault();
                        }
                    }}
                    placeholder={"+ Add task & press enter"}
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
            </Box>
        </Box>
    </Box>
);

export default TodoInput;
