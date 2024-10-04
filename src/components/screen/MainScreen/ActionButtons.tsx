import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { CheckSquare, Trash2, Eye, EyeOff, SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ActionButtonsProps {
    clearCompleted: () => void;
    clearAll: () => void;
    hasCompletedTodos: boolean;
    hasTodos: boolean;
    toggleZenMode: () => void;
    isZenMode: boolean;
    handleSettingsOpen: () => void;

}

const ActionButtons: React.FC<ActionButtonsProps> = ({ clearCompleted, clearAll, hasCompletedTodos, hasTodos, toggleZenMode, isZenMode, handleSettingsOpen }) => (
    <Box
        component={motion.div}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        sx={{
            alignSelf: "flex-start",
            mt: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
        }}
    >
        <Tooltip title="Clear Completed">
            <span>
                <IconButton
                    onClick={clearCompleted}
                    disabled={!hasCompletedTodos}
                    color="secondary"
                    size="small"
                >
                    <CheckSquare size={20} />
                </IconButton>
            </span>
        </Tooltip>
        <Tooltip title="Clear All">
            <span>
                <IconButton
                    onClick={clearAll}
                    disabled={!hasTodos}
                    color="secondary"
                    size="small"
                >
                    <Trash2 size={20} />
                </IconButton>
            </span>
        </Tooltip>
        <Tooltip title={isZenMode ? "Exit Zen Mode" : "Enter Zen Mode"}>
            <span>
                <IconButton
                    onClick={toggleZenMode}
                    color="secondary"
                    size="small"
                >
                    {isZenMode ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconButton>
            </span>
        </Tooltip>
        <Tooltip title="Settings">
            <IconButton
                color="secondary"
                size="small"
                onClick={handleSettingsOpen}
            >
                <SettingsIcon size={20} />
            </IconButton>
        </Tooltip>
    </Box>
);

export default ActionButtons;
