// src/components/ui/Header.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Header: React.FC = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%" }}>
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <Typography variant="h4" component="h1">
                EasyTodo
            </Typography>
        </Box>
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
        >
            <Typography variant="body2" component="p" color="secondary">Productivity at peak</Typography>
        </Box>
    </Box>
);

export default Header;
