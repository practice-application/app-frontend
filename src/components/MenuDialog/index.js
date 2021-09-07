import React from 'react';
import Menu from '@material-ui/core/Menu';

const MenuDialog = props => {
    return (
        <Menu
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            id="simple-menu"
            getcontentanchorel={null}
            anchorEl={props.anchorEl}
            keepMounted
            open={props.open}
            onClose={props.onClose}>
            {props.children}
        </Menu>
    )
}
export default MenuDialog