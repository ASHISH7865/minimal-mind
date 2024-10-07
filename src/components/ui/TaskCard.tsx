import React, { useState, useCallback, memo } from 'react';
import { Box, Checkbox, Typography, TextField, useTheme, IconButton, Chip } from '@mui/material';
import { Circle, CircleCheck, CircleEllipsis } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleTodo, editTodo, Todo } from '../../redux/todoSlice';

export const priorityColors = {
    HIGH: "#F28B82",
    MEDIUM: "#F7C774",
    LOW: "#B7DDB1",
};

const TaskCard = memo(({ task, onEditTask }: { task: Todo, onEditTask: (id: string) => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task?.title);
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleTitleClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(event.target.value);
    }, []);

    const handleTitleBlur = useCallback(() => {
        setIsEditing(false);
        if (editedTitle.trim() !== task?.title) {
            dispatch(editTodo({ id: task?.id, newTitle: editedTitle.trim() }));
        }
    }, [editedTitle, task?.title, task?.id, dispatch]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleTitleBlur();
        }
    }, [handleTitleBlur]);

    const handleToggle = useCallback(() => {
        dispatch(toggleTodo(task?.id));
    }, [task?.id, dispatch]);

    const handleEditClick = () => {
        onEditTask(task?.id);
    };


    return (
        <Box component="li" sx={{
            width: "100%",
            listStyle: "none",
            display: 'flex',
            gap: "2px",
            alignItems: 'center',
            padding: "1px",
            borderRadius: "5px",
            backgroundColor: `${theme.palette.background.paper}80`,
        }}>
            <Checkbox
                id={task?.id}
                icon={<Circle size={20} />}
                checkedIcon={<CircleCheck size={20} />}
                checked={task?.status === "COMPLETED"}
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
                            textDecoration: task?.status === "COMPLETED" ? "line-through" : "none",
                            color: task?.status === "COMPLETED" ? "text.secondary" : "text.primary"
                        }}
                        onDoubleClick={handleTitleClick}
                    >
                        {task?.title}
                    </Typography>
                )}

            </Box>
            {task?.priority && <Chip
                size='small'
                variant='filled'
                label={task?.priority}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    fontWeight: "bold",
                }}
            />}
            <IconButton
                size="small"
                color="secondary"
                onClick={handleEditClick}
            >
                <CircleEllipsis />
            </IconButton>
        </Box>
    );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;
