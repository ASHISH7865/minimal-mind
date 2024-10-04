import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TaskCard from "../../ui/TaskCard";
import { Todo } from "../../../redux/todoSlice";

interface TaskListProps {
    todos: Todo[];
    initialLoad: boolean;
    onEditTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ todos, initialLoad, onEditTask }) => (
    <Box sx={{ my: 2, alignSelf: "flex-start", width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        {todos?.map((todo, index) => (
                <Box
                    component={motion.div}
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: initialLoad ? 1 + index * 0.1 : 0, duration: 0.3 }}
                >
                    <TaskCard
                       task={todo}
                        onEditTask={onEditTask}
                    />
                </Box>
            ))}
            {todos.length === 0 &&
            <Box sx={{display:"flex" , flexDirection : "column" , alignItems : "center"}}>
                 <Typography color="textSecondary">No Task</Typography>
            <Typography color="textSecondary">Add a task and be productive!</Typography>
            </Box>
            }
    </Box>
);

export default TaskList;
