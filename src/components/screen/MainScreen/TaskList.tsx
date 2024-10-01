import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import TaskCard from "../../ui/TaskCard";

interface TaskListProps {
    todos: { id: string, title: string, status: string }[];
    initialLoad: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ todos, initialLoad }) => (
    <Box sx={{ my: 2, alignSelf: "flex-start", width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        {todos.map((todo, index) => (
                <Box
                    component={motion.div}
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: initialLoad ? 1 + index * 0.1 : 0, duration: 0.3 }}
                >
                    <TaskCard id={todo.id} title={todo.title} status={todo.status as "COMPLETED" | "NOT_COMPLETED"} />
                </Box>
            ))}
    </Box>
);

export default TaskList;
