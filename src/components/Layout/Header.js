import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { Link as ActionLink } from 'react-router-dom';

import MenuDialog from '../MenuDialog'
import { UserDropdown } from './UserDropwdown';

const MenuItems = [
    { label: 'Customers', link: '/customers' },
    { label: 'Organisation', link: '/organisation' },
    { label: 'Products', link: '/products' },
];

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => { setAnchorEl(e.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };


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
                <UserDropdown />
                <Hidden smUp>
                    <IconButton
                        onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <MenuDialog
                        id="iconMenu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>

                        {MenuItems.map((p, index) =>
                            <MenuItem sx={{
                                color: 'secondary.main', fontSize: '0.875rem', fontWeight: 600,
                            }}
                                key={index} component={ActionLink} onClick={handleClose} to={p.link}>
                                <ListItemText primary={p.label} /> </MenuItem>
                        )}
                    </MenuDialog>
                </Hidden>
            </Toolbar>
        </AppBar>

    );
};
export default Header