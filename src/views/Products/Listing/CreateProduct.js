import React, { useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import Container from '@mui/material/Container';

import { SuccessMessage } from '../../../components/SuccessMessage';
import { Trail } from '../../../components/Trail';
import { ProductProvider } from '../context';
import Form from './Form';

export const CreateProduct = () => {
    const [submitted, setSubmitted] = useState(false);
    const { user } = useAuth0();
    const { nickname } = user;
    const handleSubmit = () => {
        setSubmitted(true);
    };


    return (
        <ProductProvider>
            <Trail pageName={nickname} returningPage="/profile" currentPage="New Product" />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                {!submitted
                    ?
                    <Form onAction={handleSubmit} />
                    :
                    <SuccessMessage to="/products" category="Product" />
                }
            </Container>
        </ProductProvider>
    );
}
export default CreateProduct;