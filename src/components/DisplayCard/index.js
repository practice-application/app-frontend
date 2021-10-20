import React from 'react';

import { CardActionArea, CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';

import ActionLink from '../ActionLink';

export const DisplayCard = props => {
    const { title, subtitle, description, price, string, to, image } = props;

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