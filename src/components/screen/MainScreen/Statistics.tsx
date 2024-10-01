// src/components/ui/Statistics.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface StatisticsProps {
    total: number;
    completed: number;
    pending: number;
}

const Statistics: React.FC<StatisticsProps> = ({ total, completed, pending }) => (
    <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        sx={{
            alignSelf: "flex-start",
        }}
    >
        <Box sx={{ width: '100%', mt: "20px", display: 'flex', gap: 2, justifyContent: 'space-between' }}>
            <Typography variant="body2" component="span" sx={{ fontSize: { xs: 10, md: 12 }, color: 'text.secondary' }}>
                {total} total
            </Typography>
            <Typography variant="body2" component="span" sx={{ fontSize: { xs: 10, md: 12 }, color: 'success.light' }}>
                {completed} done
            </Typography>
            <Typography variant="body2" component="span" sx={{ fontSize: { xs: 10, md: 12 }, color: 'warning.light' }}>
                {pending} pending
            </Typography>
        </Box>
    </Box>
);

export default Statistics;
