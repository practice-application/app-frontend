import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


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

