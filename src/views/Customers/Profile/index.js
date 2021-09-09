import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import { useParams } from "react-router-dom";

import { TextInput } from '../../../components/TextInput'
import { config, getReqInit } from '../../../config'

const reqInit = getReqInit
const peopleUrl = config.goService.peopleApi

const Profile = () => {
    const [view, setView] = React.useState(true);
    const [person, setPerson] = React.useState([]);
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [submitting, setSubmitting] = React.useState();

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


    const handleUpdate = async () => {
        if (validEmail()) {
            setErrorMessage('');
            setSubmitting(true)
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", `${peopleUrl}/${id}`);
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

    React.useEffect(() => {
        const fetchPeople = async (id) => {
            const resp = await fetch(`${peopleUrl}/${id}`, reqInit);
            if (resp.ok) {
                const json = await resp.json();
                setPerson(json);
            }
        };
        fetchPeople(id);
    }, [id]);
    const change = () => {
        setView(false);
    };
    const changeBack = () => {
        setView(true);
    };

    return (
        <>
            <Button
                variant={view === true ? "contained" : "outlined"}
                endIcon={view === true ? <CreateIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                onClick={view === true ? change : changeBack}> {view === true ? "Edit Profile" : "Cancel"}</Button>
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
                                    value={person.firstName}
                                    id="firstName"
                                    label="First Name"
                                    onChange={e => setPerson({ ...person, firstName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextInput
                                    value={person.lastName}
                                    id="lastName"
                                    label="Last Name"
                                    onChange={e => setPerson({ ...person, lastName: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <TextInput
                            value={person.age}
                            type="number"
                            id="age"
                            label="Age"
                            onChange={e => setPerson({ ...person, age: e.target.value })}
                        />
                        <TextInput
                            value={person.email}
                            id="email"
                            label="Email"
                            error={errorMessage ? true : false}
                            errorMessage={errorMessage}
                            onChange={e => setPerson({ ...person, email: e.target.value })}
                        />
                        <TextInput
                            value={person.phone}
                            id="phone"
                            label="Phone"
                            error={errorMessage ? true : false}
                            errorMessage={errorMessage}
                            onChange={e => setPerson({ ...person, phone: e.target.value })}
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
export default Profile;