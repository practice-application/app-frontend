import React from 'react';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as ActionLink } from 'react-router-dom';

export const Trail = props => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link component={ActionLink} underline="hover" color="inherit" to={props.returningPage}>
                {props.pageName}
            </Link>
            <Typography variant="inherit">{props.currentPage}</Typography>
        </Breadcrumbs>
    )

}