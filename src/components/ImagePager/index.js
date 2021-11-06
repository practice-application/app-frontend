import React, { useState } from 'react'

import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, CardHeader, ListItemIcon } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';

export const ImagePager = props => {
    const { maxSteps, array, onDelete, onChange, image, action, upload, view, title, elevation, height } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [activeStep, setActiveStep] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Card elevation={1 || elevation}>
            {array.map((item, index) => (
                <div key={index} >
                    {activeStep === index ?
                        <>
                            <CardHeader action={action &&
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
                                        <MenuItem onClick={() => { onDelete(index); handleClose(); handleBack(index) }}>
                                            <ListItemIcon>
                                                <DeleteForeverIcon fontSize="small" />
                                            </ListItemIcon>
                                            <Typography variant="body2">Delete Image</Typography>
                                        </MenuItem>
                                        {onChange &&
                                            <MenuItem onClick={() => onChange(index)}>
                                                <ListItemIcon>
                                                    <CreateIcon fontSize="small" />
                                                </ListItemIcon>
                                                <Typography variant="body2">Change Image</Typography>
                                            </MenuItem>
                                        }
                                    </Menu>
                                    <IconButton size="small" onClick={handleClick}>
                                        <MoreVertIcon fontSize="small" />
                                    </IconButton>
                                </>
                            } disableTypography title={upload ? `${item.substring(0, 25)}...` : view && title} />
                            <CardActionArea onClick={handleClickOpen}>
                                <CardMedia
                                    component="img"
                                    height={200 | height}
                                    image={item}
                                    alt={item}
                                />
                            </CardActionArea>
                            <Dialog fullWidth onClose={handleDialogClose} open={dialogOpen}>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={item}
                                    alt={item}
                                />
                            </Dialog>
                        </>
                        : null}
                </div>
            ))
            }
            {image &&
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button onClick={handleNext} disabled={activeStep === maxSteps - 1} endIcon={<KeyboardArrowRight />} >
                            Next
                        </Button>
                    }
                    backButton={
                        <Button onClick={handleBack} disabled={activeStep === 0} startIcon={<KeyboardArrowLeft />}>
                            Back
                        </Button>
                    }
                />
            }
        </Card>
    )
}
export default ImagePager;
ImagePager.propTypes = {
    array: PropTypes.array.isRequired,
    action: PropTypes.bool,
    upload: PropTypes.bool,
    view: PropTypes.bool
};