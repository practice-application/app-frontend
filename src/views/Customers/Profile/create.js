import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Trail } from '../../../components/Trail';
import { CustomerProvider } from '../context';
import Form from './create'

const CreatePerson = () => {
    return (
        <CustomerProvider>
            <Create />
        </CustomerProvider>
    );
}

const Create = () => {
    const [submitted, setSubmitted] = useState();

    const handleSubmit = async () => {
        setSubmitted(true);

    };

    return (
        <CustomerProvider>
            <Trail pageName="Customers" returningPage="/customers" currentPage="New Customer" />
            <Container maxWidth="sm">
                {!submitted &&
                    <Form onAction={handleSubmit} />
                }
                {submitted &&
                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <Typography variant="h3">
                            Member uploaded successfully
                        </Typography>
                        <Box sx={{ pt: '1rem', width: '50%' }}>
                            <Button fullWidth variant="contained" data-test="return" href={'/customers'}>Return</Button>
                        </Box>
                    </Grid>
                }
            </Container>
        </CustomerProvider>
    );
}
export default CreatePerson;