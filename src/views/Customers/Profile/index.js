import React, { useEffect, useState } from 'react';

// import { useAuth0 } from "@auth0/auth0-react";
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from "@mui/material/CircularProgress";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";

import { TextInput } from '../../../components/TextInput';
import { Trail } from '../../../components/Trail';
import { CustomerProvider, useApi } from '../context';


const Customer = () => {
    return (
        <>
            <CustomerProvider>
                <Profile />
            </CustomerProvider>
        </>
    );
}

const Profile = () => {
    const [view, setView] = useState(true);
    const [{ person }, { fetchPerson, update, create }] = useApi();
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState(false);
    const [submitting, setSubmitting] = useState();
    // const [p = person, setPerson] = useState([])

    const validEmail = () => {
        let isValid = true;
        const emailRegex = /\S+@\S+/
        if (typeof person.email !== 'undefined') {
            if (!emailRegex.test(person.email)) {
                isValid = false;
                setErrorMessage('Please enter a valid email address');
            }
            return isValid;
        }
    }

    const handleSave = () => {
        if (validEmail()) {
            setErrorMessage('');
            setSubmitting(true);

            if (person.id) {
                update(person)
            } else {
                create(person)
            }
            setView(true);
            setSubmitting(false);
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

    useEffect(() => {
        fetchPerson(id);
    }, [fetchPerson, id]);;

    const change = () => {
        setView(false);
    };
    const changeBack = () => {
        setView(true);
    };

    person.firstName = "bob"
    console.log(person)
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Grid item>
                    <Trail pageName="Customers" returningPage="/customers" currentPage={person.firstName + ' ' + person.lastName} />
                </Grid>
                <Grid item>
                    <Button
                        variant={view === true ? "contained" : "outlined"}
                        endIcon={view === true ? <CreateIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                        onClick={view === true ? change : changeBack}> {view === true ? "Edit Profile" : "Cancel"}</Button>
                </Grid>
            </Grid>
            <Container maxWidth="sm">
                {view === true &&
                    <Card>
                        <Typography variant="h1">
                            {person.firstName} {person.lastName}
                        </Typography>
                        <Typography >
                            {person.age}
                        </Typography>
                        <Typography >
                            {person.email}
                        </Typography>
                        <Typography >
                            {person.phone}
                        </Typography>

                    </Card>
                }
                {view === false &&
                    <>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextInput
                                    value={person.firstName ? person.firstName : ""}
                                    label="First Name"
                                    id="firstName"
                                    onChange={e => (person.firstName = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextInput
                                    value={person.lastName}
                                    label="Last Name"
                                    id="lastName"
                                    onChange={e => person.lastName = e.target.value}
                                />

                            </Grid>
                        </Grid>
                        <TextInput
                            value={person.age}
                            label="Age"
                            id="age"
                            onChange={e => person.age = e.target.value}
                        />
                        <TextInput
                            label="Email Address"
                            value={person.email}
                            id="email"
                            onChange={e => person.email = e.target.value}
                            error={errorMessage ? true : false}
                            errorMessage={errorMessage}

                        />
                        <TextInput
                            value={person.phone}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            label="Phone Number"
                            type="number"
                            id="phone"
                            onChange={e => person.phone = e.target.value}
                        />
                        <Button
                            sx={{ marginTop: 2 }}
                            variant="contained"
                            onClick={(e) => handleSave(e)}
                            disabled={!formValid()}
                        >
                            {submitting ? <CircularProgress size={24} /> : 'Update person'}
                        </Button>
                    </>
                }
            </Container>
        </>
    )
}
export default Customer;