import React from 'react';

import Menu from '@mui/material/Menu';

const MenuDialog = props => {
    const { id, children, anchorEl, onClose, open } = props
    return (
        <Menu
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            id={id}
            getcontentanchorel={null}
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={onClose}>
            {children}
        </Menu>
    )
}
export default MenuDialog