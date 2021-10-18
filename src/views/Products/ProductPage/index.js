import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
// import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import ActionLink from '../../../components/ActionLink';
import SearchBar from '../../../components/SearchBar';
import { Pager } from '../../../components/TablePager';
// import { imgStorage } from '../../../config';
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
    const [view, setView] = useState('true');
    const [{ products }, { deleteProduct, fetchProducts }] = useApi();
    // const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState({ offset: 0, limit: pageSize });
    const [categories, setCategories] = useState('');

    // useEffect(() => {
    //     const fetchImages = async () => {
    //         const fileLocation = `/product-images`
    //         let result = await imgStorage.ref().child(`${fileLocation}/${products.data.imageID}/`).list();
    //         let urlPromises = result.items.map((imageRef) =>
    //             imageRef.getDownloadURL()
    //         );
    //         return Promise.all(urlPromises);
    //     };
    //     const loadImages = async () => {
    //         const urls = await fetchImages();
    //         setImages(urls);
    //     };
    //     loadImages();
    // }, [products]);

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
    const change = () => {
        setView(false);
    };
    const changeBack = () => {
        setView(true);
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
                <Grid item xs={4} md={6}>
                    <SearchBar value={query} onChange={setQuery} />
                </Grid>
                <Grid item xs={4} md={2}>
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
                            <MenuItem >Technology & Electronics</MenuItem>
                            <MenuItem >Music</MenuItem>
                            <MenuItem >Books</MenuItem>
                            <MenuItem >Services</MenuItem>
                            <MenuItem >Clothing, Men's</MenuItem>
                            <MenuItem >Clothing, Women</MenuItem>
                            <MenuItem >Clothing, children's</MenuItem>
                            <MenuItem >Vehicles</MenuItem>
                            <MenuItem >Hobbies</MenuItem>
                            <MenuItem >Gaming</MenuItem>
                            <MenuItem >Music</MenuItem>
                            <MenuItem >Books</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>




                <Grid item xs={4} md={4}>
                    <Button
                        sx={{ mr: 1 }}
                        variant="outlined"
                        endIcon={view === true ? <CloseIcon fontSize="small" /> : <CreateIcon fontSize="small" />}
                        onClick={view === true ? change : changeBack}> {view === true ? "Close" : "Edit"}
                    </Button>
                    <Button variant='contained' component={ActionLink} to="/add-product">
                        Add new Product
                    </Button>
                </Grid>
            </Grid>


            {products.data ?
                <>
                    <Grid container spacing={1} direction="row" justifyContent="flex-start" >
                        {products.data.filter((item) => {
                            var search = (item.name) + (item.category) + (item.tags.map((tag) => tag))
                            if (query === "") {
                                return item
                            } else if (search.toLowerCase().includes(query.toLowerCase())
                            ) {
                                return item
                            }
                        }).map((item, index) =>
                            <Grid key={index} item xs={3}>
                                <Card sx={{ m: 1 }}>
                                    <CardHeader
                                        title={item.name}
                                        subheader={`$${item.price}`}
                                        action={view === true ?
                                            <IconButton size="small" onClick={() => handleDelete(item.id)}>
                                                <DeleteForeverIcon />
                                            </IconButton> : ''}
                                    />

                                    {/* <CardMedia
                                        component="img"
                                        height="190"

                                        image={items = `${item.imageID}/${item.name + ", " + item.user}`}
                                        alt=""
                                    /> */}

                                    <CardContent>
                                        <Chip size="small" variant="outlined" sx={{ mx: 0.25 }} label={item.category} />
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                        {item.tags.map((tag, i) => <Chip size="small" sx={{ mx: 0.25 }} key={i} label={tag} />)}
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Button component={ActionLink} to={`/products/${item.id}`}>
                                            View Product
                                        </Button>
                                    </CardActions>
                                </Card>
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