import React from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format, parseISO } from 'date-fns';
import Moment from 'react-moment';


export const UserInfo = (props) => {
    const { name, userName, birthDate, date, emailAddress, avatar } = props
    const { user } = useAuth0();
    const { picture, email, nickname } = user;

    return (
        <Card elevation={1} sx={{ mb: 1 }}>
            <CardContent >
                <List sx={{ padding: 2 }}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{ pb: 2 }}
                    >
                        <Avatar
                            sx={{ width: 250, height: 250 }}
                            src={avatar === undefined ? picture : avatar}
                            alt="Profile"
                        />
                        <Typography variant="h2">{name} </Typography>
                    </Stack>
                    <ListItem>
                        <ListItemText>Username </ListItemText>{userName === undefined ? nickname : userName}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Email </ListItemText>{emailAddress === undefined ? email : emailAddress}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Birth Date</ListItemText>{birthDate !== '' && format(parseISO(birthDate), 'MMMM d yyyy')}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Profile Created</ListItemText><Moment fromNow interval={30000} date={date} />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}
