import React from 'react';

import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { TextInput } from '../../../components/TextInput';
import { Trail } from '../../../components/Trail';
import { config } from '../../../config';

const peopleUrl = config.goService.peopleApi

const CreatePerson = () => {
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [person, setPerson] = React.useState({});
    const [submitting, setSubmitting] = React.useState();
    const [submitted, setSubmitted] = React.useState();

    const validEmail = () => {
        let isValid = true;
        const emailRegex = /\S+@\S+/
        if (typeof person.email !== 'undefined') {
            if (!emailRegex.test(person.email)) {
                isValid = false;
                setErrorMessage('Please enter a valid email address');
            }

        }
        return isValid;
    }

    const handleSubmit = async () => {
        if (validEmail()) {
            setErrorMessage('');
            setSubmitting(true)
            var xhr = new XMLHttpRequest();
            xhr.open("POST", peopleUrl);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    var status = xhr.status;
                    if (status === 0 || (status >= 200 && status < 400)) {
                        setSubmitted(true);
                    } else {
                        console.error(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(person));
        }
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
                                    id="firstName"
                                    label="First Name"
                                    onChange={e => setPerson({ ...person, firstName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextInput
                                    id="lastName"
                                    label="Last Name"
                                    onChange={e => setPerson({ ...person, lastName: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <TextInput
                            type="number"
                            id="filled-required"
                            label="Age"
                            onChange={e => setPerson({ ...person, age: e.target.value })}
                        />
                        <TextInput
                            id="email"
                            label="Email"
                            error={errorMessage ? true : false}
                            errorMessage={errorMessage}
                            onChange={e => setPerson({ ...person, email: e.target.value })}
                        />
                        <TextInput
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            type="number"
                            id="filled-required"
                            label="phone"
                            onChange={e => setPerson({ ...person, phone: e.target.value })}
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