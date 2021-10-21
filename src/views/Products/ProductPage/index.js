import React, { useEffect, useState } from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ActionLink from '../../../components/ActionLink';
import { DisplayCard } from '../../../components/DisplayCard';
import Dropdown from '../../../components/Dropdown';
import SearchBar from '../../../components/SearchBar';
import { Pager } from '../../../components/TablePager';
import { imgStorage } from '../../../config';
import { ProductProvider } from '../context';
import { useApi } from '../context';

const pageSize = 12;

export const ProductPageExt = () => {
    return (
        <ProductProvider>
            <ProductPage />
        </ProductProvider>
    );
}

const ProductPage = () => {
    const [{ products }, { fetchProducts }] = useApi();
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState({ offset: 0, limit: pageSize });
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchProducts(page);
    }, [fetchProducts, page]);


    const pageRefresh = () => {
        window.location.reload()
    };

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handlePage = () => {
        setPage(prev => ({ ...prev, offset: prev.offset + pageSize }))
    };

    const imagePage = products.data && products.data.map((item) => item.imageID)
    var items = imagePage
    console.log(items)

    useEffect(() => {
        const fetchImages = async () => {
            const fileLocation = `/product-images/12af8dee-326e-43cb-876e-bccf1a9c07fb`
            let result = await imgStorage.ref().child(fileLocation).list();
            let urlPromises = result.items.map((imageRef) =>
                imageRef.getDownloadURL()
            );
            return Promise.all(urlPromises);
        };
        const loadImages = async () => {
            const urls = await fetchImages();
            setImages(urls);
        };
        loadImages();
    }, []);

    return (
        <>
            <Grid
                sx={{ pb: 2 }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={8} md={10}>
                    <SearchBar value={query} onChange={setQuery} />
                </Grid>
                <Grid item xs={4} md={2}>
                    <Dropdown dataType="productDropdown" value={category} onChange={handleChange} />
                </Grid>
            </Grid>
            {products.data ?
                <>
                    <Grid container spacing={1} direction="row" justifyContent="flex-start" >
                        {products.data.filter(item => query + category
                            ? ((item.name) + (item.category) + (item.tags.map((tag) => tag))).toLowerCase().includes(query + category.toLowerCase())
                            : item).map((item, index) =>
                                <Grid key={index} item xs={3}>
                                    <DisplayCard
                                        image={images}
                                        dataType="large"
                                        string={item.id}
                                        title={item.name}
                                        subtitle={item.category}
                                        price={item.price}
                                        description={item.description} />
                                </Grid>

                            )}

                    </Grid>

                    <Pager count={products.data.length} total={products.matches}
                        onPage={() => handlePage()}
                    />
                </>
                :
                <Grid sx={{ py: 4 }} container direction="column" justify="center" alignItems="center" >
                    <ErrorOutlineIcon />
                    <Typography sx={{ pt: 2 }}>Search could not find any product(s) of that description</Typography>
                    <Box sx={{ display: 'flex', my: 1, padding: 0.5 }}>
                        <Button variant='contained' sx={{ mr: 0.5 }} component={ActionLink} to="/add-product">Add Product</Button>
                        <Button variant='outlined' sx={{ ml: 0.5 }} onClick={pageRefresh}>Return</Button>
                    </Box>
                </Grid>
            }
        </>
    );
}

export default ProductPageExt;