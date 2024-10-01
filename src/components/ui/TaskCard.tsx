import React, { useState, useCallback, memo } from 'react';
import { Box, Checkbox, Typography, TextField } from '@mui/material';
import { Circle, CircleCheck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleTodo, editTodo } from '../../redux/todoSlice';


const TaskCard = memo(({ id, title, status }: { id: string; title: string; status: 'COMPLETED' | 'NOT_COMPLETED' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const dispatch = useDispatch();

    const handleTitleClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(event.target.value);
    }, []);

    const handleTitleBlur = useCallback(() => {
        setIsEditing(false);
        if (editedTitle.trim() !== title) {
            dispatch(editTodo({ id, newTitle: editedTitle.trim() }));
        }
    }, [editedTitle, title, id, dispatch]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleTitleBlur();
        }
    }, [handleTitleBlur]);

    const handleToggle = useCallback(() => {
        dispatch(toggleTodo(id));
    }, [id, dispatch]);

    return (
        <Box component="li" sx={{
            width: "100%",
            listStyle: "none",
            display: 'flex',
            gap: "2px",
            alignItems: 'center',
            padding: "1px",
            borderRadius: "5px",
        }}>
            <Checkbox
                id={id}
                icon={<Circle size={14} />}
                checkedIcon={<CircleCheck size={14} />}
                checked={status === "COMPLETED"}
                onChange={handleToggle}
            />
            <Box component="div" sx={{ flexGrow: 2 }}>
                {isEditing ? (
                    <TextField
                        value={editedTitle}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        fullWidth
                        variant="standard"
                        sx={{
                            fontWeight: 600,
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                ) : (
                    <Typography
                        sx={{
                            fontWeight: 600,
                            textDecoration: status === "COMPLETED" ? "line-through" : "none",
                            color: status === "COMPLETED" ? "text.secondary" : "text.primary"
                        }}
                        onDoubleClick={handleTitleClick}
                    >
                        {title}
                    </Typography>
                )}
            </Box>
        </Box>
    );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;
