import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ActionLink from '../../../components/ActionLink';
import { Trail } from '../../../components/Trail';
import { ProductProvider } from '../context';
import Form from './Form';

export const CreateProduct = () => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = () => {
        setSubmitted(true);
    };


    return (
        <ProductProvider>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Trail pageName="Products" returningPage="/products" currentPage="New Product" />
                {!submitted
                    ?
                    <Form onAction={handleSubmit} />
                    :
                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <Typography variant="h3">
                            Product uploaded successfully
                        </Typography>
                        <Box sx={{ pt: '1rem', width: '50%' }}>
                            <Button fullWidth variant="contained" data-test="return" component={ActionLink} to="/products">Return</Button>
                        </Box>
                    </Grid>
                }
            </Container>
        </ProductProvider>
    );
}
export default CreateProduct;