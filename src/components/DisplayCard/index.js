import React, { useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, CardHeader, ListItemIcon } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';

import ActionLink from '../ActionLink';

export const DisplayCard = props => {
    const { user } = useAuth0();
    const { nickname } = user;
    const { title, subtitle, description, price, onDelete, string, owner, to, image } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Card sx={{ m: 1 }}>
            {owner === nickname &&
                <CardHeader action={
                    <>
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
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
                            <MenuItem onClick={() => { onDelete(string); handleClose() }}>
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
                }
                />
            }
            <CardActionArea component={ActionLink} to={`/products/${string}` || to} >
                <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={`${image} text`}
                />
                <CardHeader
                    title={<Typography variant="h5">
                        {title}
                    </Typography>}
                    subheader={subtitle}
                />
                <ListItem>
                    <Typography noWrap variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        <Typography color="text.secondary" variant="caption">
                            Price
                        </Typography>
                        <Typography variant="body1">
                            {`$${price}`}
                        </Typography>
                    </Stack>
                </ListItem>
            </CardActionArea>
        </Card>
    )
}
export default DisplayCard;
DisplayCard.propTypes = {
    onDelete: PropTypes.func,

};