import React, { useEffect, useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';

import ActionLink from '../../components/ActionLink';
import { DisplayCard } from '../../components/DisplayCard';
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
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    var emailVerified;
    if (email_verified === true) {
        emailVerified = <CheckCircleIcon />
    } else {
        emailVerified = "Needs verification"
    }

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);



    const handleDelete = async (id) => {
        deleteProduct(id);
    };


    console.log(useAuth0())


    return (
        <Container maxWidth="md">
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Personal Info" value="1" />
                        <Tab label="My Cart" value="2" />
                        <Tab label="My Listings" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
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
                </TabPanel>
                <TabPanel value="2">
                    <Typography variant="h2" noWrap>Saved Items</Typography>
                </TabPanel>
                <TabPanel value="3">{products.data &&
                    <>
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
                        <DisplayCard dataType="small"
                            array={products.data} onDelete={handleDelete} />
                    </>

                }</TabPanel>
            </TabContext>
        </Container>

    );

};

export default User;