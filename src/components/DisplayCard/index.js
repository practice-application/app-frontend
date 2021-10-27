import React, { useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { CardActionArea, CardHeader, CardActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';

import ActionLink from '../ActionLink';

export const DisplayCard = (props) => {
    const { title, subtitle, description, price, string, to, image, dataType, onDelete, person } = props

    switch (dataType) {
        case 'large':
            return <BigDisplayCard title={title} subtitle={subtitle} description={description}
                price={price} string={string} to={to} image={image} />
        case 'small':
            return <MiniDispayCard person={person} title={title} subtitle={subtitle} image={image} to={to} onDelete={onDelete} />
        default:
            throw new Error('Invalid dataType prop passed to Card');
    }
}
export default DisplayCard;

const BigDisplayCard = props => {
    const { title, subtitle, description, price, string, to, image } = props;
    const [view, setView] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [watchlist, setWatchlist] = useState([]);
    const list = []

    const save = () => {
        bookmark === false && setBookmark(true);
        bookmark === true && setBookmark(false);
    }

    const addToWatchlist = () => {
        view === false && setView(true);
        const newWatchlist = [...watchlist, string];
        setWatchlist(newWatchlist);

        const addList = newWatchlist.concat(list);
        console.log(addList);
    };

    const removeFromWatchlist = () => {
        // view === false && setView(true);
        view === true && setView(false);
        console.log("UNSAVED", string)
    }

    return (
        <Card sx={{ m: 1 }}>
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
            </CardActionArea>
            <CardActions disableSpacing  >
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
                <Stack
                    direction="row"
                    alignItems="flex-start"
                >
                    <IconButton onClick={save}>
                        {bookmark === false ?
                            <BookmarkBorderOutlinedIcon />
                            :
                            <BookmarkOutlinedIcon sx={{ color: 'secondary.main' }} />
                        }
                    </IconButton>

                    {view === false ?
                        <IconButton onClick={addToWatchlist}>
                            <ShoppingCartOutlinedIcon />
                        </IconButton>
                        :
                        <IconButton onClick={removeFromWatchlist}>
                            <ShoppingCartIcon sx={{ color: 'secondary.main' }} />
                        </IconButton>
                    }

                </Stack>
            </CardActions>
        </Card>
    )
}


const MiniDispayCard = props => {
    const { to, title, subtitle, image, onDelete, person } = props;

    const { user } = useAuth0();
    const { nickname } = user;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };




    const handleClose = () => {
        setAnchorEl(null);
    };
    return (


        <Card sx={{ my: 1 }}>
            {nickname === person &&
                <ListItem secondaryAction={
                    <>
                        <Popover
                            elevation={2}
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
                            <MenuItem onClick={() => { onDelete(); handleClose() }}>
                                <ListItemIcon>
                                    <DeleteForeverIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="body2">Remove listing</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ShareIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="body2">Share</Typography>
                            </MenuItem>
                        </Popover>
                        <IconButton size="small" onClick={handleClick}>
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    </>
                }>
                    <ListItemButton component={ActionLink} to={`/products/${to}`}>
                        <ListItemAvatar>
                            <Avatar variant="rounded" sx={{ width: 56, height: 56, mr: 1 }} src={image}
                                alt={`${image} text`} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={title}
                            secondary={subtitle}
                        />
                    </ListItemButton>
                </ListItem>

            }
        </Card>

    )
}
DisplayCard.propTypes = {
    onDelete: PropTypes.func,
    array: PropTypes.array,

};