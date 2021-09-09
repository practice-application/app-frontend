import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link as ActionLink } from 'react-router-dom';

import MenuDialog from '../MenuDialog'

const MenuItems = [
    { label: 'Customers', link: '/customers' },
    { label: 'Organisation', link: '/organisation' },
    { label: 'Products', link: '/products' },
];

export const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
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
                <Button color={anchorEl ? "secondary" : "primary"} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <AccountCircleIcon />
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

                </MenuDialog>
            </Toolbar>
        </AppBar>

    );
};