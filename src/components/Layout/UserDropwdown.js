import React, { useState, useEffect } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { Link as ActionLink } from 'react-router-dom';

import { useApi, CustomerProvider } from '../../views/Customers/context';
import MenuDialog from '../MenuDialog'

const profile = [
    { label: "My Cart", icon: <ShoppingCartIcon color="primary" fontSize="small" />, value: '1' },
    { label: "Saved Items", icon: <BookmarkOutlinedIcon color="primary" fontSize="small" />, value: '2' },
    { label: "My Listings", icon: <ListIcon color="primary" fontSize="small" />, value: '3' },
    { label: "Personal Info", icon: <PersonIcon color="primary" fontSize="small" />, value: '4' },
];

export const UserDropdown = () => {
    return (
        <CustomerProvider>
            <User />
        </CustomerProvider>
    );
}

const User = () => {
    const [{ people }, { fetchPeople }] = useApi();
    const { logout, user } = useAuth0();
    const { picture, nickname, sub } = user;
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => { setAnchorEl(e.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };


    useEffect(() => {
        fetchPeople();
    }, [fetchPeople]);

    const filtered = people.data.filter(item => item.auth0id === sub).map((item) =>
        item.auth0id.includes(sub)
    );



    return (
        <>
            <Button startIcon={picture ? <Avatar
                sx={{ width: 24, height: 24 }}
                src={picture}
                alt="Profile"
            /> : <AccountCircleIcon />} color={anchorEl ? "secondary" : "primary"} onClick={handleClick}>
                {nickname}
            </Button>
            <MenuDialog
                id="customerMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {people.data && filtered.length > 0 ?
                    filtered.map((i) =>
                        <div key={i}>
                            {people.data.filter(item => item.auth0id === sub).map((item, i) =>
                                <div key={i}>
                                    {profile.map((tab, k) =>
                                        <MenuItem key={k} id={tab.id} component={ActionLink} onClick={handleClose} to={{
                                            pathname: `${window.location.pathname.includes(`customers/${item.id}`) ? '' : 'customers/'}${item.id}`,
                                            state: tab.value,
                                        }} >
                                            <ListItemIcon>
                                                {tab.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={tab.label} />
                                        </MenuItem>
                                    )}
                                </div>
                            )}
                        </div>
                    ) :
                    <MenuItem selected component={ActionLink} to="onboarding">
                        <ListItemIcon>
                            <AddIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Add your Details" />
                    </MenuItem>
                }
                <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
                    <ListItemIcon>
                        <LogoutIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </MenuItem>
            </MenuDialog>
        </>
    )
}