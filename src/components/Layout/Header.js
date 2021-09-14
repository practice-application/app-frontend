import React from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { Link as ActionLink } from 'react-router-dom';

import MenuDialog from '../MenuDialog'



const MenuItems = [
    { label: 'Customers', link: '/customers' },
    { label: 'Organisation', link: '/organisation' },
    { label: 'Products', link: '/products' },
];

export const Header = () => {
    const { logout, user } = useAuth0();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };
    const { picture, nickname } = user;

    return (
        <AppBar elevation={1} position="static" sx={{ padding: 1 }} color="transparent" data-cy="header">
            <Toolbar sx={{
                mx: 4,

            }}>
                <Link component={ActionLink} sx={{ display: 'flex', '& svg': { fontSize: '3rem' } }} to="/">
                </Link>
                <Box flexGrow={1}>
                    <Hidden smDown>
                        {MenuItems.map((p, index) =>
                            <Button sx={{ mx: 1 }} data-ele={p.label && p.label.toLowerCase()} component={ActionLink} key={index} to={p.link}>
                                {p.label}
                            </Button>
                        )}

                    </Hidden>
                </Box>
                <Button startIcon={picture ? <Avatar
                    sx={{ width: 24, height: 24 }}
                    src={picture}
                    alt="Profile"
                /> : <AccountCircleIcon />} color={anchorEl ? "secondary" : "primary"} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    {nickname}
                </Button>
                <MenuDialog
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem component={ActionLink} onClick={handleClose} to="/profile">
                        <ListItemText primary="Personal Details" />
                    </MenuItem>
                    <Hidden mdUp>
                        {MenuItems.map((p, index) =>
                            <MenuItem sx={{
                                color: 'secondary.main', fontSize: '0.875rem', fontWeight: 600,
                            }}
                                key={index} component={ActionLink} onClick={handleClose} to={p.link}>
                                <ListItemText primary={p.label} /> </MenuItem>
                        )}

                    </Hidden>
                    <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
                        <ListItemText primary="Logout" />
                    </MenuItem>
                </MenuDialog>
            </Toolbar>
        </AppBar>

    );
};