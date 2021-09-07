import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';


const EmptyMessage = () => {
    return (
        <Box sx={{ py:"10rem" }} >
            <Grid container direction="column" justify="center" alignItems="center" >
                <TrendingUpIcon />
                <Typography>No data to display right now.</Typography>
            </Grid>
        </Box>

    )
}
export default EmptyMessage;