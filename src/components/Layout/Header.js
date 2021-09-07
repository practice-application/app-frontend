import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
//import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
// eslint-disable-next-line import/order
import Link from '@material-ui/core/Link';

// import clsx from 'clsx';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link as RouterLink, /* useLocation */ } from 'react-router-dom';

import { HomeIcon } from '../icons/HomeIcon';
import MenuDialog from '../MenuDialog'


// const useStyles = makeStyles(theme => ({
//     toolbar: {
//         margin: theme.spacing(0, 4),
//         [theme.breakpoints.down('sm')]: {
//             padding: theme.spacing(0, 0),
//         },
//     },
//     navItem: {
//         color: theme.palette.text.secondary,
//         margin: theme.spacing(0, 2),
//     },
//     selected: {
//         color: theme.palette.secondary.main,
//     },

//     detailMenu: {
//         background: theme.palette.background.default,
//     },
//     menuItem: {
//         color: theme.palette.primary.main,
//         fontSize: '0.875rem',
//         fontWeight: 600,
//         '&:focus': {
//             backgroundColor: theme.palette.secondary.main,
//             color: theme.palette.background.default,
//             '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//                 color: theme.palette.background.default,
//             },
//         },
//     },

// }));

const MenuItems = [
    { label: 'Demo', link: '/' },
    { label: 'Customer', link: '/customer' },
    { label: 'Operation', link: '/operation' },
];

export const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };
    //const theme = useTheme();
    // const location = useLocation();

    return (
        <AppBar elevation={1} position="static" sx={{ padding: 1 }} color="transparent" data-cy="header">
            <Toolbar sx={{
                margin: 4,

            }}>
                <Link component={RouterLink} sx={{ display: 'flex', '& svg': { fontSize: '3rem' } }} to="/">
                    <HomeIcon alt="" />
                </Link>
                <Box flexGrow={1}>
                    <Hidden smDown>
                        {MenuItems.map((p, index) =>
                            <Button data-ele={p.label && p.label.toLowerCase()} component={RouterLink} key={index} to={p.link}>
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
                    <MenuItem component={RouterLink} onClick={handleClose} to="/profile">
                        <ListItemText primary="Personal Details" />
                    </MenuItem>
                    <Hidden mdUp>
                        {MenuItems.map((p, index) =>

                            <MenuItem sx={{
                                color: 'secondary.main', fontSize: '0.875rem', fontWeight: 600,
                            }}
                                key={index} component={RouterLink} onClick={handleClose} to={p.link}>
                                <ListItemText primary={p.label} /> </MenuItem>
                        )}
                    </Hidden>

                </MenuDialog>
            </Toolbar>
        </AppBar>

    );
};