import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format, parseISO } from 'date-fns';
import Moment from 'react-moment';
import { useParams } from "react-router-dom";

import { Trail } from '../../../components/Trail';
import { CustomerProvider, useApi } from '../context';
import { Form } from './Form'

export const Profile = () => {
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
    const submit = () => {
        window.location.reload(false);
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
                    <Container maxWidth={view ? "sm" : "md"}>
                        {view ? (
                            <Stack
                                direction="column"
                                spacing={2}
                            >
                                <Card sx={{ mt: 1, p: 1 }}>
                                    <CardHeader title={`${person.firstName} ${person.lastName}`} />
                                    <ListItem>
                                        <ListItemText>Birth Date</ListItemText>{person.birthDate !== '' && format(parseISO(person.birthDate), 'MMMM d yyyy')}
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText>Email</ListItemText>{person.email}
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText>Phone Number</ListItemText>{person.phone}
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText>Account Created</ListItemText><Moment fromNow interval={30000} date={person.date} />
                                    </ListItem>
                                </Card>

                                {person.address &&
                                    <Card sx={{ p: 1 }}>
                                        <CardHeader title="Address" />
                                        <ListItem>
                                            <Typography >
                                                {person.addressLine1}
                                                <br />
                                                {person.addressLine2}
                                                <br />
                                                {person.suburb && ""} {person.city}
                                                <br />
                                                {person.region}
                                                <br />
                                                {person.country}
                                            </Typography>
                                        </ListItem>
                                    </Card>
                                }
                            </Stack>
                        ) : (
                            <Form onAction={submit} />
                        )}

                    </Container>

                </>
            }
        </>
    )
}

export default Profile;