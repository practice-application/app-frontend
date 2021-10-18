import React, { forwardRef } from 'react';

import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export const ActionLink = forwardRef((props, ref) => {
    const { to } = props;
    if (!to.startsWith("/")) {
        return <Link underline="none" ref={ref} target="_blank" rel="noopener" href={to} {...props} />;
    }
    if (to.includes("#")) {
        return <HashLink  {...props} />;
    }
    return <RouterLink ref={ref} {...props} />;
});

export default ActionLink;