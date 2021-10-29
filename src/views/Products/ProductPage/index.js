import React, { useEffect, useState } from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
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
    const [imgProducts, setImgProducts] = useState([]);
    const [cart, setCart] = useState(0);

    // fetch products
    useEffect(() => {
        fetchProducts(page);
    }, [fetchProducts, page]);

    // add images to products
    useEffect(() => {
        const addImages = async () => {
            const promises = products.data.map(async prd => {
                const res = await imgStorage.ref().child(`/product-images/${prd.imageID}`).list();
                prd.imgUrl = await res.items[0].getDownloadURL();
                return prd;
            });

            setImgProducts(await Promise.all(promises));
        }
        addImages();
    }, [products.data]);

    const pageRefresh = () => {
        window.location.reload()
    };

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handlePage = () => {
        setPage(prev => ({ ...prev, offset: prev.offset + pageSize }))
    };

    const addToBasket = () => {
        setCart(o => o + 1)
    };
    const removeBasket = () => {
        setCart(o => o - 1)
    };


    return (
        <>
            {cart > 0 && <Chip color="error" label={cart} />}
            <Grid
                sx={{ pb: 2 }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={8} md={6}>
                    <SearchBar value={query} onChange={setQuery} />
                </Grid>
                <Grid item xs={4} md={2}>
                    <Dropdown dataType="productDropdown" value={category} onChange={handleChange} />
                </Grid>
            </Grid>
            {imgProducts ?
                <>
                    <Grid container spacing={1} direction="row" justifyContent="flex-start" >
                        {products.data.filter(item => query + category
                            ? ((item.name) + (item.category) + (item.tags.map((tag) => tag))).toLowerCase().includes(query + category.toLowerCase())
                            : item).map((p, index) =>
                                <Grid key={index} item xs={3}>

                                    <DisplayCard
                                        elevation={p.priority === true ? 1 : 2}
                                        remove={removeBasket}
                                        addToBag={() => addToBasket(p.id)}
                                        image={p.imgUrl}
                                        dataType="large"
                                        string={p.id}
                                        title={p.priority === true ?
                                            <Stack
                                                direction="row"
                                                alignItems="center"

                                            ><StarIcon sx={{
                                                color: 'warning.main',
                                                fontSize: 22,
                                                mr: 0.5
                                            }} />
                                                {p.name}</Stack> : p.name}
                                        subtitle={p.category}
                                        price={p.price}
                                        description={p.description} />
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