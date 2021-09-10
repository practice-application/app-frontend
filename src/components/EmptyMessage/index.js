import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';


const EmptyMessage = () => {
    return (
        <Box sx={{ py: "10rem" }} >
            <Grid container direction="column" justify="center" alignItems="center" >
                <TrendingUpIcon />
                <Typography>No data to display right now.</Typography>
            </Grid>
        </Box>

    )
}
export default EmptyMessage;