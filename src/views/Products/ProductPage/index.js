import React, { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { TablePager } from '../../../components/TablePager';
import { ProductProvider } from '../context';
import { ProductCard } from '../ProductCard/index';

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
        <Grid container spacing={2} direction='row' justifyContent="flex-start" alignItems="center">
            {/* {wrap the product context arounf here */}
            <Grid item>
                <ProductCard />
            </Grid>
            {/* } */}
        </Grid>

    );
}

export default ProductPage;
