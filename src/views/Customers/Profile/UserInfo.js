import React from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { format, parseISO } from 'date-fns';
import Moment from 'react-moment';

import { CustomerProvider } from '../context';

export const UserInfo = (props) => {
    const { name, userName, birthDate, date } = props
    return (
        <CustomerProvider>
            <Customer name={name} date={date} userName={userName} birthDate={birthDate} />
        </CustomerProvider>
    );
}

const Customer = (props) => {
    const { name, userName, birthDate, date } = props
    const { user } = useAuth0();
    const { picture, email, nickname, email_verified } = user;

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
                        <ListItemText>Name</ListItemText>{name}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Username </ListItemText>{userName === undefined ? nickname : userName}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Email </ListItemText>{email}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Birth Date</ListItemText>{birthDate !== '' && format(parseISO(birthDate), 'MMMM d yyyy')}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Account Created</ListItemText><Moment fromNow interval={30000} date={date} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Verified Email</ListItemText>{emailVerified()}
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}