import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from '../ProductCard/index';



import ActionLink from '../../../components/ActionLink';
import { TablePager } from '../../../components/TablePager';
import { useApi } from '../context';
import { ProductProvider } from '../context';

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
    // const [{ people }, { deletePerson, fetchPeople }] = useApi();
    const [page, setPage] = useState({ offset: 0, limit: pageSize });

    // useEffect(() => {
    //      fetchPeople(page);
    // }, [fetchPeople, page]);

    const handleDelete = (id) => {
        // deletePerson(id);
    };

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
        <Grid container spacing={2} direction='row' justifyContent="space-around" alignItems="center">
            <Grid item>
                <ProductCard />
            </Grid>
            <Grid item>
                <ProductCard />
            </Grid>
            <Grid item>
                <ProductCard />
            </Grid>
            <Grid item>
                <ProductCard />
            </Grid>
            <Grid item>
                <ProductCard />
            </Grid>
            <Grid item>
                <ProductCard />
            </Grid>
            <Grid item>
                <ProductCard />
            </Grid>
            <Grid item>
                <ProductCard />
            </Grid>

        </Grid>

    );
}

export default ProductPage;
