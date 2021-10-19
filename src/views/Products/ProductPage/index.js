import React, { useEffect, useState } from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import ActionLink from '../../../components/ActionLink';
import { DisplayCard } from '../../../components/DisplayCard';
import SearchBar from '../../../components/SearchBar';
import { Pager } from '../../../components/TablePager';
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
    const [{ products }, { deleteProduct, fetchProducts }] = useApi();
    const [query, setQuery] = useState('');
    const [page, setPage] = useState({ offset: 0, limit: pageSize });
    const [categories, setCategories] = useState('');

    useEffect(() => {
        fetchProducts(page);
    }, [fetchProducts, page]);


    const pageRefresh = () => {
        window.location.reload()
    };

    const handleChange = (event) => {
        setCategories(event.target.value);
    };

    const handleDelete = async (id) => {
        deleteProduct(id);
    };

    const handlePage = () => {
        setPage(prev => ({ ...prev, offset: prev.offset + pageSize }))
    };

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
                <Grid item xs={4} md={7}>
                    <SearchBar value={query} onChange={setQuery} />
                </Grid>
                <Grid item xs={4} md={3}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ m: -1 }} id="demo-simple-select-label">Categories</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            value={categories}
                            label="Categories"
                            onChange={handleChange}
                        >
                            <MenuItem value={'Technology&Electronics'}>Technology & Electronics</MenuItem>
                            <MenuItem value={'Music'}>Music</MenuItem>
                            <MenuItem value={'Books'}>Books</MenuItem>
                            <MenuItem value={'Services'}>Services</MenuItem>
                            <MenuItem value={'Clothing, Mens'}>Clothing, Men's</MenuItem>
                            <MenuItem value={'Clothing, Women'}>Clothing, Women</MenuItem>
                            <MenuItem value={'Clothing, childrens'}>Clothing, children's</MenuItem>
                            <MenuItem value={'Vehicles'}>Vehicles</MenuItem>
                            <MenuItem value={'Toys & Games'}>Toys & Games</MenuItem>
                            <MenuItem value={'Hobbies'}>Hobbies</MenuItem>
                            <MenuItem value={'Gaming'}>Gaming</MenuItem>
                            <MenuItem value={'Homeware'}>Homeware</MenuItem>
                            <MenuItem value={'Movies & Entertainment'}>Movies & Entertainment</MenuItem>
                            <MenuItem value={'Food & Drink'}>Food & Drink</MenuItem>
                            <MenuItem value={'Toiletries'}>Toiletries</MenuItem>
                            <MenuItem value={'Office'}>Office</MenuItem>
                            <MenuItem value={'Furniture'}>Furniture</MenuItem>
                            <MenuItem value={'Misc'}>Misc</MenuItem>
                            <MenuItem value={'Replicas'}>Replicas</MenuItem>
                            <MenuItem value={'Pet care'}>Pet care</MenuItem>
                            <MenuItem value={'Jewelery & Accessories'}>Jewelery & Accessories</MenuItem>
                            <MenuItem value={'Sports & Recreation'}>Sports & Recreation</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Button variant='contained' component={ActionLink} to="/add-product">
                        Add new Product
                    </Button>
                </Grid>
            </Grid>
            {products.data ?
                <>
                    <Grid container spacing={1} direction="row" justifyContent="flex-start" >
                        {products.data.filter(item => query
                            ? ((item.name) + (item.category) + (item.tags.map((tag) => tag))).toLowerCase().includes(query.toLowerCase())
                            : item).map((item, index) =>
                                <Grid key={index} item xs={3}>
                                    <DisplayCard
                                        string={item.id}
                                        onDelete={handleDelete}
                                        title={item.name}
                                        subtitle={item.category}
                                        price={item.price}
                                        owner={item.user}
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