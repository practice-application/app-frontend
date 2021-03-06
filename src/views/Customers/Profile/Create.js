import React, { useState } from 'react';

import Container from '@mui/material/Container';

import { SuccessMessage } from '../../../components/SuccessMessage';
import { Trail } from '../../../components/Trail';
import { CustomerProvider } from '../context';
import Form from './Form';


export const Create = () => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <CustomerProvider>
            <Trail pageName="Customers" returningPage="/customers" currentPage="Create Profile" />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {!submitted
                    ?
                    <Form onAction={handleSubmit} />
                    :
                    <SuccessMessage to="/customers" category="Your profile" />
                }
            </Container>
        </CustomerProvider>
    );
}
export default Create;
