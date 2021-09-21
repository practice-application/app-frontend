import React, { useEffect } from 'react';

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
import { useForm } from '../../../components/TextInput/useForm';
import { Trail } from '../../../components/Trail';
import { config } from '../../../config';
import { CustomerProvider, useApi } from '../context';

const Customer = () => {
    return (
        <CustomerProvider>
            <Profile />
        </CustomerProvider>
    );
}

const Profile = () => {
    const [view, setView] = React.useState(true);
    const [{ person }, { fetchPerson, editPerson }] = useApi();
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [submitting, setSubmitting] = React.useState();
    const [form, setForm, isValid] = useForm({
        firstName: { label: "First Name", value: person.firstName },
        lastName: { label: "Last Name", value: person.lastName },
        age: { label: "Age", value: person.age },
        phone: { label: "Phone Number", value: person.phone },
        email: { label: "Email address", value: person.email }
    });

    const validEmail = () => {
        const emailRegex = /\S+@\S+/
        if (typeof person.email !== 'undefined') {
            if (!emailRegex.test(person.email)) {
                setErrorMessage('Please enter a valid email address');
            }
        }
        return isValid;
    }

    const handleUpdate = async () => {
        if (validEmail()) {
            setErrorMessage('');
            setSubmitting(true)
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", `${config.url}/people/${id}`);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    var status = xhr.status;
                    if (status === 0 || (status >= 200 && status < 400)) {
                        setView(true);
                        setSubmitting(false)
                    } else {
                        console.error(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(person));
        }
    };

    const formValid = () => {
        if (!form.email) {
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
                                    field={form.firstName}

                                    label="First Name"
                                    onChange={setForm}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextInput
                                    field={form.lastName}
                                    label="Last Name"
                                    onChange={setForm}
                                />
                            </Grid>
                        </Grid>
                        <TextInput
                            field={form.age}
                            type="number"
                            label="Age"
                            onChange={setForm}
                        />
                        <TextInput
                            field={form.email}
                            error={errorMessage ? true : false}
                            errorMessage={errorMessage}
                            onChange={setForm}
                        />
                        <TextInput
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            field={form.phone}
                            id="phone"
                            error={errorMessage ? true : false}
                            errorMessage={errorMessage}
                            onChange={setForm}
                        />
                        <Button
                            sx={{ marginTop: 2 }}
                            variant="contained"
                            onClick={(e) => handleUpdate(e)}
                            disabled={!formValid()}
                        >
                            {submitting ? <CircularProgress size={24} /> : 'Update'}
                        </Button>
                    </>
                }
            </Container>
        </>
    )
}
export default Customer;