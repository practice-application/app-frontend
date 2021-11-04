import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useApi } from '../../views/Products/context';
 
const Cart = () => {
    //const [{ addToCart }] = useApi();
        
    // useEffect(() => {
    //     addToCart();
    // }, [addToCart]);

    return (
        <>
        <Typography>
            I AM A CART

        </Typography>
        </>


    )
};

export default Cart;