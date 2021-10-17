import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
// import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ActionLink from '../../../components/ActionLink';
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
    const [{ products }, { deleteProduct, fetchProducts, searchProducts }] = useApi();
    // const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState({ offset: 0, limit: pageSize });

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

    const handleSearch = (e) => {
        searchProducts(query)
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
    console.log(products.data)
    return (
        <>

            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={6} md={9}>
                    <TextField id="outlined-basic" size="small" variant="outlined" fullWidth label="Search" onChange={(e) => { setQuery(e.target.value) }}
                        InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton onClick={() => handleSearch()}><SearchIcon /></IconButton></InputAdornment>), }} />
                </Grid>
                <Grid item xs={6} md={3}>
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
                    <Grid container spacing={2} direction="row" justifyContent="flex-start" >
                        {products.data.filter((item) => {
                            if (query === "") {
                                return item
                            } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
                                return item
                            }
                        }).map((item, index) =>
                            <Grid key={index} item xs={3}>
                                <Card sx={{ m: 1, padding: 1, }}>
                                    <CardHeader
                                        title={item.name}
                                        subheader={`$${item.price}`}
                                        action={view === true ?
                                            <IconButton size="small" onClick={() => handleDelete(item.id)}>
                                                <DeleteForeverIcon />
                                            </IconButton> : ''}
                                    />
                                    <Chip size="small" variant="outlined" sx={{ mx: 0.25 }} label={item.category} />
                                    {/* <CardMedia
                                        component="img"
                                        height="190"

                                        image={items = `${item.imageID}/${item.name + ", " + item.user}`}
                                        alt=""
                                    /> */}

                                    <CardContent>
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
                        <Button variant='outlined' sx={{ ml: 0.5 }} component={ActionLink} to="/products">Return</Button>
                    </Box>

                </Grid>
            }
        </>
    );
}

export default ProductPageExt;