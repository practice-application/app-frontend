import React, { useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

import MenuDialog from '../MenuDialog'

const profile = [
    { label: "My Cart", icon: <ShoppingCartIcon color="primary" fontSize="small" />, value: '1' },
    { label: "Saved Items", icon: <BookmarkOutlinedIcon color="primary" fontSize="small" />, value: '2' },
    { label: "My Listings", icon: <ListIcon color="primary" fontSize="small" />, value: '3' },
    { label: "Personal Info", icon: <PersonIcon color="primary" fontSize="small" />, value: '4' },
];

export const UserDropdown = () => {
    const { logout, user } = useAuth0();
    const { picture, nickname } = user;
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => { setAnchorEl(e.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

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
                {profile.map((item, i) =>
                    <MenuItem key={i} id={item.id} component={ActionLink} onClick={handleClose} to={{
                        pathname: "/profile",
                        state: item.value,
                    }} >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </MenuItem>
                )}
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