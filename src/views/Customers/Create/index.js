import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { TextInput } from '../../../components/TextInput';
import { Trail } from '../../../components/Trail';
import { useApi } from '../context';


const CreatePerson = () => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [, { createPerson }] = useApi();
    const [submitting, setSubmitting] = useState();
    const [submitted, setSubmitted] = useState();
    const [person, setPerson] = useState({});


    // const validEmail = () => {
    //     let isValid = true;
    //     const emailRegex = /\S+@\S+/
    //     if (typeof setPerson() !== 'undefined') {
    //         if (!emailRegex.test(email)) {
    //             isValid = false;
    //             setErrorMessage('Please enter a valid email address');
    //         }
    //     }
    //     return isValid;
    // }


    const handleSubmit = async () => {
        createPerson(person)
        setSubmitting(true)
        setSubmitted(true);

    };

    // const formValid = () => {
    //     if (!setPerson.email) {
    //         return false;
    //     }
    //     for (var err in setPerson.errors) {
    //         if (setPerson.errors[err]) {
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    return (
        <>
            <Trail pageName="Customers" returningPage="/customers" currentPage="New Customer" />
            <Container maxWidth="sm">
                {!submitted &&
                    <>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextInput

                                    label="First Name"
                                    id="firstName"
                                    onChange={e => setPerson(prev => ({ ...prev, firstName: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextInput
                                    label="Last Name"
                                    id="lastName"
                                    onChange={e => setPerson(prev => ({ ...prev, lastName: e.target.value }))}
                                />
                            </Grid>
                        </Grid>
                        <TextInput
                            label="Age"
                            id="age"
                            onChange={e => setPerson(prev => ({ ...prev, age: e.target.value }))}
                        />
                        <TextInput
                            label="Email Address"
                            id="email"
                            onChange={e => setPerson(prev => ({ ...prev, email: e.target.value }))}
                            error={errorMessage ? true : false}
                            errorMessage={errorMessage}

                        />
                        <TextInput
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            label="Phone Number"
                            type="number"
                            id="phone"
                            onChange={e => setPerson(prev => ({ ...prev, phone: e.target.value }))}
                        />
                        <Button
                            sx={{ marginTop: 2 }}
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                        // disabled={!formValid()}
                        >
                            {submitting ? <CircularProgress size={24} /> : 'Create New Client'}
                        </Button>
                    </>
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
        </>
    );
}

export default CreatePerson;