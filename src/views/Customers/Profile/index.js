import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";

import { Trail } from '../../../components/Trail';
import { CustomerProvider, useApi } from '../context';
import { Form } from './Form'

const Profile = () => {
    return (
        <CustomerProvider>
            <Customer />
        </CustomerProvider>
    );
}

const Customer = () => {
    const [view, setView] = useState(true);
    const [state, { fetchPerson }] = useApi();
    const [person, setPerson] = useState();
    const { id } = useParams();

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
                            <Form onAction={changeBack} />
                        )}
                    </Container>
                </>
            }
        </>
    )
}

export default Profile;