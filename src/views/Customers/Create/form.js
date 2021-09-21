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


    // const email = () => {
    //     const emailRegex = /\S+@\S+/
    //     if (typeof person.email && !(emailRegex.test(person.email))) {
    //         return `Email is invalid format. Include country code: +64 123456789`
    //     }
    //     return '';
    // };

    // const validEmail = async () => {
    //     let isValid = true;
    //     const emailRegex = /\S+@\S+/
    //     if (typeof person.email !== 'undefined') {
    //         if (!emailRegex.test(person.email)) {
    //             isValid = false;
    //             setErrorMessage('Please enter a valid email address');
    //         }
    //     }
    //     return isValid;
    // }

    const handleSubmit = () => {
        // setErrorMessage('');
        // createPerson();
        createPerson()
        setSubmitting(true)
        setSubmitted(true);

    };

    const formValid = () => {
        if (!person.email) {
            return false;
        }
        for (var err in person.errors) {
            if (person.errors[err]) {
                return false;
            }
        }
        return true;
    };

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
                                    onChange={val => setPerson(prev => ({ ...prev, firstName: val }))}
                                />
                            </Grid>

                            <Grid item xs={6} >
                                <TextInput
                                    label="Last Name"
                                    id="lastName"
                                    onChange={val => setPerson(prev => ({ ...prev, lastName: val }))}
                                />

                            </Grid>
                        </Grid>
                        <TextInput
                            label="Age"
                            id="age"
                            onChange={val => setPerson(prev => ({ ...prev, age: val }))}
                        />
                        <TextInput
                            label="Email Address"
                            id="email"
                            onChange={val => setPerson(prev => ({ prev, email: val }))}
                            error={errorMessage ? true : false}
                            errorMessage={errorMessage}

                        />
                        <TextInput
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            label="Phone Number"
                            type="number"
                            id="phone"
                            onChange={val => setPerson(prev => ({ ...prev, phone: val }))}
                        />
                        <Button
                            sx={{ marginTop: 2 }}
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                            disabled={!formValid()}
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