import React, { useEffect, useState } from 'react';

// import { useAuth0 } from "@auth0/auth0-react";
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from "@mui/material/CircularProgress";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";

import { Trail } from '../../../components/Trail';
import { CustomerProvider, useApi } from '../context';


const Customer = () => {
    return (
        <CustomerProvider>
            <Profile />
        </CustomerProvider>
    );
}

const Profile = () => {
    const [view, setView] = useState(true);
    const [state, { fetchPerson, update, create }] = useApi();
    const [person, setPerson] = useState();
    const { id } = useParams();
    const [errorMsg, setErrorMsg] = useState(false);
    const [submitting, setSubmitting] = useState();

    const validEmail = () => {
        let isValid = true;
        const emailRegex = /\S+@\S+/
        if (typeof person.email !== 'undefined') {
            if (!emailRegex.test(person.email)) {
                isValid = false;
                setErrorMsg('Please enter a valid email address');
            }
            return isValid;
        }
    }

    const handleSave = () => {
        if (validEmail()) {
            setErrorMsg(null);
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
    }, [fetchPerson, id]);

    useEffect(() => {
        setPerson(state.person);
    }, [state.person]);

    const change = () => {
        setView(false);
    };
    const changeBack = () => {
        setView(true);
    };

    const handleChange = (e) => {
        const key = e.target.id;
        const val = e.target.value;

        setPerson(prev => {
            prev[key] = val;
            return { ...prev };
        });
    }

    return (
        <>
            {person &&
                <>
                    <Grid container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Grid item>
                            <Trail pageName="Customers" returningPage="/customers"
                                currentPage={person.firstName + ' ' + person.lastName} />
                        </Grid>
                        <Grid item>
                            <Button
                                variant={view === true ? "contained" : "outlined"}
                                endIcon={view === true ? <CreateIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                                onClick={view === true ? change : changeBack}> {view === true ? "Edit Profile" : "Cancel"}</Button>
                        </Grid>
                    </Grid>
                    <Container maxWidth="sm">
                        {view ? (
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
                        ) : (
                            <>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <TextField id="firstName" label="First Name"
                                            size="small" variant="outlined" fullWidth
                                            value={person && person.firstName}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField id="lastName" label="Last Name"
                                            size="small" variant="outlined" fullWidth
                                            value={person && person.lastName}
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                </Grid>
                                <TextInput id="age" label="Age"
                                    size="small" variant="outlined" fullWidth
                                    value={person && person && person.age}
                                    onChange={handleChange}
                                />
                                <TextInput id="email" label="Email Address"
                                    size="small" variant="outlined" fullWidth
                                    value={person && person.email}
                                    onChange={handleChange}
                                    error={Boolean(errorMsg)}
                                    helperText={errorMsg}

                                />
                                <TextInput id="phone" label="Phone Number"
                                    size="small" variant="outlined" fullWidth type="number"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    value={person && person.phone}
                                    onChange={handleChange}
                                />
                                <Button
                                    sx={{ marginTop: 2 }}
                                    variant="contained"
                                    onClick={handleSave}
                                    disabled={!formValid()}
                                >
                                    {submitting ? <CircularProgress size={24} /> : 'Update person'}
                                </Button>
                            </>
                        )}
                    </Container>
                </>
            }
        </>
    )
}

const TextInput = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

export default Customer;