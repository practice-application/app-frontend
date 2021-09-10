import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const Footer = () => {
    return (
        <Box sx={{
            margin: 3,
            padding: 2,
            textAlign: 'center',
            height: 3
        }}>
            <Typography variant="body2" component="span">
                Made by Zachary Weston with love
            </Typography>
        </Box>
    );
};

