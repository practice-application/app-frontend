import * as React from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ActionLink from '../../../components/ActionLink';

export const ProductCard = props => {

  return (
    <Card sx={{ maxWidth: 345, boxShadow: '-1px 4px 20px -6px rgba(0, 0, 0, 1.75)' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.subtitle}
      />
      <CardMedia
        component="img"
        height="194"
        image='https://mui.com/static/images/cards/paella.jpg'  //   {props.image}
        alt={props.imageAlt}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
        </IconButton>
        <IconButton aria-label="share" component={ActionLink} to="/products/listing">
          <UnfoldMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
