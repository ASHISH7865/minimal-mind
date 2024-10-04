import React, { useState, KeyboardEvent, useEffect } from 'react';
import { Box, Drawer, Typography, useTheme, Chip, InputBase, IconButton } from '@mui/material';
import { Priority, Todo } from '../../redux/todoSlice';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateTodoPriority, addTagToTodo, removeTagFromTodo } from '../../redux/todoSlice';
import { priorityColors } from './TaskCard';

interface TaskPriorityDrawerProps {
    open: boolean;
    onClose: () => void;
    task: Todo;
}

const TaskPriorityDrawer: React.FC<TaskPriorityDrawerProps> = ({ open, onClose, task }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [selectedPriority, setSelectedPriority] = useState<Priority>(task?.priority);
    const [newTag, setNewTag] = useState('');
    const [localTags, setLocalTags] = useState<string[]>([]);

    useEffect(() => {
        if (task) {
            setSelectedPriority(task.priority);
            setLocalTags(task.tags);
        }
    }, [task]);

    const handlePriorityClick = (priority: Priority) => {
        setSelectedPriority(priority);
        dispatch(updateTodoPriority({ id: task.id, priority }));
    };

    const handleAddTag = () => {
        if (newTag && !localTags.includes(newTag)) {
            dispatch(addTagToTodo({ id: task.id, tag: newTag }));
            setLocalTags([...localTags, newTag]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        dispatch(removeTagFromTodo({ id: task.id, tag: tagToRemove }));
        setLocalTags(localTags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTag();
        }
    };

    const PriorityChip = ({ priority }: { priority: Priority }) => (
        <Chip
            label={priority.charAt(0) + priority.slice(1).toLowerCase()}
            onClick={() => handlePriorityClick(priority)}
            variant={selectedPriority === priority ? "filled" : "outlined"}
            sx={{
                color: selectedPriority === priority ? 'white' : priorityColors[priority],
                backgroundColor: selectedPriority === priority ? priorityColors[priority] : 'transparent',
                borderColor: priorityColors[priority],
                '&:hover': {
                    backgroundColor: `${priorityColors[priority]} !important` ,
                },
            }}
        />
    );

    if (!task) return null;

    return (
        <Drawer anchor="bottom" open={open} onClose={onClose}>
            <Box sx={{ padding: 2, width: '100%', display: 'flex', flexDirection: 'column', gap: 4, background: theme.palette.background.paper }}>
                <Box sx={{ display: 'flex', gap:2, alignItems: 'center' }}>
                    <Typography>{task?.title}</Typography>
                    <Chip sx={{ fontSize: { xs: 10, md: 12 } }} size="small" variant={task?.status === "COMPLETED" ? "filled" : "outlined"} label={task?.status === "COMPLETED" ? "Completed" : "Not Completed"} />
                </Box>
                <Box>
                    <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: 'text.secondary', mb: 2 }}>Priority</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <PriorityChip priority="HIGH" />
                        <PriorityChip priority="MEDIUM" />
                        <PriorityChip priority="LOW" />
                    </Box>
                </Box>
                <Box>
                    <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: 'text.secondary', mb: 2 }}>Tags</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                        {localTags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                onDelete={() => handleRemoveTag(tag)}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, minWidth: 100 }}>
                            <InputBase
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={"Add tags"}
                                sx={{
                                    flexGrow: 1,
                                    fontSize: '0.8125rem',
                                    '& input': {
                                        padding: '5px 8px',
                                    },
                                }}
                            />
                            <IconButton onClick={handleAddTag} color="primary" size="small">
                                <Plus size={16} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};

export default TaskPriorityDrawer;
