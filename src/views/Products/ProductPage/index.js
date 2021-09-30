import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ActionLink from '../../../components/ActionLink';
import { TablePager } from '../../../components/TablePager';
import { ProductProvider } from '../context';
import { useApi } from '../context';


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
    const [{ products }, { deleteProduct, fetchProducts }] = useApi();
    const [page, setPage] = useState({ offset: 0, limit: pageSize });

    useEffect(() => {
        fetchProducts(page);
    }, [fetchProducts, page]);

    const handleDelete = (id) => {
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
    console.log(products)

    return (
        <Container maxWidth='xl'>
            <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', my: 1, padding: 0.5 }}>
                    <Button
                        variant="outlined"
                        endIcon={view === true ? <CloseIcon fontSize="small" /> : <CreateIcon fontSize="small" />}
                        onClick={view === true ? change : changeBack}> {view === true ? "Close" : "Edit"}
                    </Button>
                </Box>
                <Box container sx={{ display: 'flex', my: 1, padding: 0.5 }}>
                    <Button variant='contained' component={ActionLink} to="/products/create">
                        Create Product
                    </Button>
                </Box>
            </Grid>
            {products.data ?
                <>
                    <Grid container spacing={2} direction='row' justifyContent='space-evenly' sx={{ paddingTop: 10 }}>
                        <Grid item container >


                            {products.data.map((item) =>
                                <Card spacing={4} key={item.id} sx={{ padding: 1, maxWidth: 345, boxShadow: '-1px 4px 20px -6px rgba(0, 0, 0, 1.75)' }}>
                                    <Grid sx={{ height: 50, padding: 0.5 }}>
                                        <Typography variant='h2'>
                                            {item.name}
                                        </Typography>

                                        <Grid container direction="row" justifyContent="flex-end" sx={{ paddingBottom: 10 }}>
                                            {view === true ?
                                                <IconButton size="small" onClick={() => handleDelete(item.id)}>
                                                    <DeleteForeverIcon />
                                                </IconButton> : ''}
                                        </Grid>

                                    </Grid>
                                    <Grid sx={{ paddingBottom: 4 }}>
                                        <Typography variant='h3'>
                                            ${item.price}
                                        </Typography>
                                    </Grid>
                                    <CardMedia
                                        component="img"
                                        height="190"
                                        image={item.image}
                                        alt={'image'}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            {/* <FavoriteIcon /> */}
                                        </IconButton>
                                        <IconButton aria-label="share" component={ActionLink} to={`/products/${item.id}`}>
                                            <UnfoldMoreIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            )}
                        </Grid>
                    </Grid>
                    <TablePager count={products.data.length} total={products.matches}
                        colSpan={3} onPage={() => handlePage()}
                    />
                </>
                :
                <Grid sx={{ py: 4 }} container direction="column" justify="center" alignItems="center" >
                    <ErrorOutlineIcon />
                    <Typography sx={{ pt: 2 }}>No customer data to display at the moment</Typography>
                    <Box sx={{ display: 'flex', my: 1, padding: 0.5 }}>
                        <Button variant='contained' sx={{ mr: 0.5 }} component={ActionLink} to="/add">Add Product</Button>
                        <Button variant='outlined' sx={{ ml: 0.5 }} component={ActionLink} to="/products/create">Return</Button>
                    </Box>
                </Grid>
            }
        </Container>
    );
}

export default ProductPageExt;