import React, { useEffect, useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dateFormat from 'dateformat';

import ActionLink from '../../components/ActionLink';
import { DisplayCard } from '../../components/DisplayCard';
import { imgStorage } from '../../config';
import { useApi } from '../Products/context';
import { ProductProvider } from '../Products/context';


const tabArray = [
    { label: "Personal Info", icon: <PersonIcon />, value: '1' },
    { label: "My Cart", icon: <ShoppingCartIcon />, value: '2' },
    { label: "My Listings", icon: <ListIcon />, value: '3' },
]

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
    const [imgProducts, setImgProducts] = useState([]);

    var emailVerified;
    if (email_verified === true) {
        emailVerified = <CheckCircleIcon sx={{ color: 'success.main' }} />
    } else {
        emailVerified = "Needs verification"
    }

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        const addImages = async () => {
            const promises = products.data.map(async prd => {
                const res = await imgStorage.ref().child(`/product-images/${prd.imageID}`).list();
                prd.imgUrl = await res.items[0].getDownloadURL();
                return prd;
            });

            setImgProducts(await Promise.all(promises));
        }
        addImages();
    }, [products.data]);


    const handleDelete = (id) => {
        deleteProduct(id);
    };

    return (
        <Container maxWidth="md">
            <Card elevation={2} sx={{ mb: 1, py: 2 }}>
                <ButtonGroup variant="text">
                    {tabArray.map((item, i) =>
                        <Button sx={value === item.value ? { color: 'primary.main' } : { color: 'grey.300' }} key={i} onClick={() => setValue(item.value)} startIcon={item.icon} >
                            {item.label} {item.value.includes(3) ?
                                <Chip sx={{ ml: 1 }} color="error" size='small' label={products.data.length} />
                                : ''
                            }
                        </Button>
                    )}
                </ButtonGroup>
            </Card>
            {value === '1' &&
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
                                    <ListItemText>Verified Email</ListItemText>{emailVerified}
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </>
            }
            {value === '2' &&
                <Typography variant="h2" noWrap>Saved Items</Typography>
            }
            {value === '3' &&
                <>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="h2" noWrap>My Listings</Typography>
                        <Button startIcon={<AddOutlinedIcon />} variant='contained' component={ActionLink} to="/add-product">
                            Create new Listing
                        </Button>
                    </Stack>
                    {products.data ?
                        <>
                            {imgProducts ?
                                <List>
                                    {products.data.map((p, i) =>
                                        <DisplayCard
                                            title={p.name}
                                            subtitle={p.category}
                                            to={p.id}
                                            person={p.user}
                                            image={p.imgUrl}
                                            key={i}
                                            dataType="small"
                                            onDelete={() => handleDelete(p.id)} />
                                    )}
                                </List>
                                :
                                ''
                            }

                        </>
                        : <Typography>No Listings to show</Typography>
                    }
                </>
            }
        </Container>
    );

};

export default User;