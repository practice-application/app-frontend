import React from 'react'

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ActionLink from '../ActionLink';

export const SuccessMessage = props => {
    const { to, category } = props;
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" >
            <Typography variant="h3">
                {category} uploaded successfully
            </Typography>
            <Box sx={{ pt: '1rem', width: '50%' }}>
                <Button fullWidth variant="contained" data-test="return" component={ActionLink} to={to}>Return</Button>
            </Box>
        </Grid>
    )
}
export default SuccessMessage;