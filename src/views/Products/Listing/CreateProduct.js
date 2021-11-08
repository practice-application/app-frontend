import React, { useState } from 'react';

import Container from '@mui/material/Container';

import { SuccessMessage } from '../../../components/SuccessMessage';
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
            <Trail pageName="Products" returningPage="/" currentPage="New Product" />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                {!submitted
                    ?
                    <Form onAction={handleSubmit} />
                    :
                    <SuccessMessage to="/" category="Product" />
                }
            </Container>
        </ProductProvider>
    );
}
export default CreateProduct;