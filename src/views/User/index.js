import React, { useEffect, useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";

import ActionLink from '../../components/ActionLink';
import { DisplayCard } from '../../components/DisplayCard';
import { imgStorage } from '../../config';
import { useApi } from '../Products/context';
import { ProductProvider } from '../Products/context';
import { ProfileCard } from './ProfileCard'


const tabArray = [
    { label: "My Cart", icon: <ShoppingCartIcon />, value: '1' },
    { label: "Saved Items", icon: <BookmarkOutlinedIcon />, value: '2' },
    { label: "My Listings", icon: <ListIcon />, value: '3' },
    { label: "Personal Info", icon: <PersonIcon />, value: '4' },
]

export const User = () => {
    return (
        <ProductProvider>
            <Profile />
        </ProductProvider>
    );
}

const Profile = () => {
    const location = useLocation()
    const { user } = useAuth0();
    const { nickname } = user;
    const [{ products }, { deleteProduct, fetchProducts }] = useApi();
    const [imgProducts, setImgProducts] = useState([]);
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

    const chip = () => {
        if (products.data.map((item) => nickname === item.user).length > 0) {
            return <Chip sx={{ ml: 1 }} color="error" size='small' label={products.data.filter((item) => nickname === item.user).length} />
        } return ''
    }

    var state
    if (location.state === undefined) {
        state = value
    }
    else {
        state = value && location.state
    }


    return (
        <Container maxWidth="md">
            <Card elevation={2} sx={{ mb: 1, py: 2 }}>
                <ButtonGroup variant="text">
                    {tabArray.map((item, i) =>
                        <Button sx={state === item.value ? { color: 'primary.main' } : { color: 'grey.300' }} key={i} onClick={() => (setValue(item.value, location.state = undefined))} startIcon={item.icon} >
                            {item.label}  {item.value.includes(3) ?
                                chip()
                                : ''
                            }
                        </Button>
                    )}
                </ButtonGroup>
            </Card>

            {state === '1' &&
                <Typography variant="h2" noWrap>Saved Items</Typography>
            }
            {state === '3' &&
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
            {state === '4' &&
                <ProfileCard />
            }
        </Container>
    );
};

export default User;