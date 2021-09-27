import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import { TablePager } from '../../../components/TablePager';
import { ProductProvider } from '../context';
import { ProductCard } from '../ProductCard/index';
import { useApi } from '../context';

import ActionLink from '../../../components/ActionLink';

const pageSize = 10;

const ProductPageExt = () => {
    return (
        <ProductProvider>
            <ProductPage />
        </ProductProvider>
    );
}

const ProductPage = () => {
    const [view, setView] = useState('true');
    // const [{ products }, { deleteProduct, fetchProducts }] = useApi();
    const [page, setPage] = useState({ offset: 0, limit: pageSize });

    // useEffect(() => {
    //      fetchProducts(page);
    // }, [fetchProducts, page]);

    // const handleDelete = (id) => {
    //     deleteProduct(id);
    // };

    const handlePage = () => {

        setPage(prev => ({ ...prev, offset: prev.offset + pageSize }))
    };
    const change = () => {
        setView(false);
    };
    const changeBack = () => {
        setView(true);
    };

    return (
        <Grid container spacing={2} direction='row' justifyContent="flex-start" alignItems="center">
            <Grid container direction='row' sx={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 10}}>
                <Box sx={{ display: 'flex', my: 1, padding: 0.5 }}>
                    {/* <Button
                        variant="outlined"
                        endIcon={view === true ? <CloseIcon fontSize="small" /> : <CreateIcon fontSize="small" />}
                        onClick={view === true ? change : changeBack}> {view === true ? "Close" : "Edit"}</Button> */}

                </Box>
                <Box sx={{ display: 'flex', my: 1, padding: 0.5 }}>
                    <Button variant='contained' component={ActionLink} to="/products/create">Add Product</Button>
                </Box>
            </Grid>
            <ProductProvider>
                <Grid item>
                    <ProductCard />
                </Grid>
            </ProductProvider>
        </Grid>

    );
}

export default ProductPage;
