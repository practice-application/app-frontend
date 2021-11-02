import React, { useEffect, useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useParams, useLocation } from "react-router-dom";

import { Trail } from '../../../components/Trail';
import { CustomerProvider, useApi } from '../context';
import { CustomerListings } from './CustomerListings';
import Form from './Form'
import { UserInfo } from './UserInfo';

export const Profile = () => {
    return (
        <CustomerProvider>
            <Customer />
        </CustomerProvider>
    );
}

const tabArray = [
    { label: "My Cart", icon: <ShoppingCartIcon />, value: '1' },
    { label: "Saved Items", icon: <BookmarkOutlinedIcon />, value: '2' },
    { label: "My Listings", icon: <ListIcon />, value: '3' },
    { label: "Personal Info", icon: <PersonIcon />, value: '4' },
]

const Customer = () => {
    const location = useLocation()
    const [view, setView] = useState(true);
    const [state, { fetchPerson }] = useApi();
    const [person, setPerson] = useState();
    const { user } = useAuth0();
    const { sub } = user;
    const { id } = useParams();
    const [value, setValue] = useLocalStorage('1');
    function useLocalStorage(key) {
        const [storedValue, setStoredValue] = useState(() => {
            try {
                const item = window.localStorage.getItem('1');
                return item ? JSON.parse(item) : '1';
            } catch (error) {
                return '1';
            }
        });
        const setValue = (value) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) { }
        };
        return [storedValue, setValue];
    }


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

    var tab
    if (location.state === undefined) {
        tab = person && person.auth0id === sub && value
    }
    else {
        tab = value && location.state
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
                        {person.auth0id === sub &&
                            <Grid item>
                                <Button
                                    variant={view === true ? "contained" : "outlined"}
                                    endIcon={view === true ? <CreateIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                                    onClick={view === true ? change : changeBack}> {view === true ? "Edit Profile" : "Cancel"}</Button>
                            </Grid>
                        }
                    </Grid>
                    <Container maxWidth={view ? "sm" : "md"}>
                        {person.auth0id === sub &&
                            <ButtonGroup variant="text">
                                {tabArray.map((item, i) =>
                                    <Button sx={tab === item.value ? { color: 'primary.main' } : { color: 'grey.300' }} key={i} onClick={() => (setValue(item.value, location.state = undefined))} startIcon={item.icon} >
                                        {item.label}  {item.value.includes('3') ?
                                            "test"
                                            : ''
                                        }
                                    </Button>
                                )}
                            </ButtonGroup>
                        }
                        {view ? (
                            <Stack
                                direction="column"
                                spacing={2}
                            >
                                {tab === '1' &&
                                    <Typography variant="h2" noWrap>My Cart</Typography>
                                }
                                {tab === '2' &&
                                    <Typography variant="h2" noWrap>Saved Items</Typography>
                                }
                                {tab === '3' &&
                                    <CustomerListings />
                                }
                                {tab === '4' &&
                                    <>
                                        <UserInfo date={person.date} name={`${person.firstName} ${person.lastName}`} userName={person.userName} birthDate={person.birthDate} />
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
                                    </>
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