import React from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

export const ProfileCard = () => {
    const { user } = useAuth0();
    const { name, picture, email, nickname, email_verified, created_at } = user;

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
                <Button startIcon={<CreateIcon />} variant='contained' >
                    Edit Profile
                </Button>
            </Stack>
            <Card elevation={1} sx={{ mb: 1 }}>
                <CardContent>
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