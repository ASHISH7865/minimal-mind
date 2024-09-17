import React, { useState, useCallback, memo } from 'react';
import { Box, Checkbox, SxProps, Typography, TextField } from "@mui/material";
import { Circle, CircleCheck } from "lucide-react";
import { Todo, useTodo } from "../providers/TodoProvider";
import theme from "../../theme";

const titleStyle: SxProps = {
    fontWeight: 600,
    fontSize: theme.typography.body1.fontSize,
};

const TaskCard = memo(({ id, title, status }: Todo) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const { toggleTodo, editTodo } = useTodo();

    const handleTitleClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(event.target.value);
    }, []);

    const handleTitleBlur = useCallback(() => {
        setIsEditing(false);
        if (editedTitle.trim() !== title) {
            editTodo(id, editedTitle.trim());
        }
    }, [editedTitle, title, id, editTodo]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleTitleBlur();
        }
    }, [handleTitleBlur]);

    const handleToggle = useCallback(() => {
        toggleTodo(id);
    }, [id, toggleTodo]);

    return (
        <Box component="li" sx={{
            width: "100%",
            listStyle: "none",
            display: 'flex',
            gap: "2px",
            alignItems: 'center',
            padding: "1px",
            borderRadius: "5px",
            ":hover": {
                bgcolor: theme.palette.background.paper
            }
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
                        sx={titleStyle}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                ) : (
                    <Typography
                        sx={{
                            ...titleStyle,
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
