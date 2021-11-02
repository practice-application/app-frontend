import React, { useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';

import { CustomerProvider } from '../Customers/context';

export const ProfileCard = () => {
    return (
        <CustomerProvider>
            <Customer />
        </CustomerProvider>
    );
}

const Customer = () => {
    const { user } = useAuth0();
    const { picture, email, nickname, email_verified, created_at } = user;
    const [view, setView] = useState(true)
    // const [{ people }, { fetchPeople }] = useApi();



    const change = () => {
        setView(false);
    };
    const changeBack = () => {
        setView(true);

    };


    const emailVerified = () => {
        if (email_verified === true) {
            return <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                typography: 'body1',
                color: 'success.main',
            }} ><CheckCircleIcon fontSize="small" /> Verified</Box>

        } else {
            return "Needs verification"
        }
    }


    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Typography variant="h2" gutterBottom noWrap>Personal Details</Typography>
                <Button
                    variant={view === true ? "contained" : "outlined"}
                    endIcon={view === true ? <CreateIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                    onClick={view === true ? change : changeBack}> {view === true ? "Edit Profile" : "Cancel"}</Button>
            </Stack>
            <Card elevation={1} sx={{ mb: 1 }}>
                <CardContent >
                    <List sx={{ padding: 2 }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    src={picture}
                                    alt="Profile"
                                />
                            </ListItemAvatar>
                        </ListItem>

                        <ListItem>
                            <ListItemText>Name</ListItemText>
                        </ListItem>

                        <Divider />
                        <ListItem>
                            <ListItemText>Username </ListItemText>{nickname}
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText>Email </ListItemText>{email}
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText>Created at</ListItemText>{dateFormat((created_at), "dd/mm/yyyy")}
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText>Verified Email</ListItemText>{emailVerified()}
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </>
    )
}
export default ProfileCard;