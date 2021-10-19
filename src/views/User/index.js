import React, { useEffect, useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';

import ActionLink from '../../components/ActionLink';
import { useApi } from '../Products/context';
import { ProductProvider } from '../Products/context';


export const User = () => {
    return (
        <ProductProvider>
            <Profile />
        </ProductProvider>
    );
}

const Profile = () => {
    const { user } = useAuth0();
    const { name, picture, email, nickname, email_verified, created_at } = user;
    const [{ products }, { deleteProduct, fetchProducts }] = useApi();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    var emailVerified;
    if (email_verified === true) {
        emailVerified = <CheckCircleIcon />
    } else {
        emailVerified = "Needs verification"
    }

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = async (id) => {
        deleteProduct(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Container maxWidth="md">
            <Typography variant="h2" gutterBottom noWrap>Personal Details</Typography>
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
                            <ListItemText>Name  </ListItemText>{name}
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
                            <ListItemText>Verified Email</ListItemText>{emailVerified}
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
            {products.data &&
                <Box sx={{ pt: 3 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="h2" noWrap>My Listings</Typography>
                        <Button variant='contained' component={ActionLink} to="/add-product">
                            Create new Listing
                        </Button>
                    </Stack>

                    <List>
                        {products.data.map((item, index) =>
                            <Card sx={{ my: 1 }} key={index}>
                                {item.user === nickname &&
                                    <ListItem secondaryAction={
                                        <>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <MenuItem onClick={() => { handleDelete(item.id); handleClose() }}>
                                                    <ListItemIcon>
                                                        <DeleteForeverIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Typography variant="body2">Delete</Typography>
                                                </MenuItem>
                                            </Menu>
                                            <IconButton size="small" onClick={handleClick}>
                                                <MoreVertIcon fontSize="small" />
                                            </IconButton>
                                        </>
                                    }>
                                        <ListItemAvatar>
                                            <Avatar>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={item.category}
                                        />
                                    </ListItem>
                                }
                            </Card>
                        )}
                    </List>
                </Box>
            }
        </Container >

    );

};

export default User;