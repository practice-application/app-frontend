import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import { TablePager } from '../../../components/TablePager';
import { ProductProvider } from '../context';
import { useApi } from '../context';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ActionLink from '../../../components/ActionLink';


const pageSize = 10;

const ProductPageExt = () => {
    return (
        <ProductProvider>
            <ProductPage/>
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
        <>
        <Grid container sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
                    <Grid container direction='row' sx={{ justifyContent: 'space-between', paddingTop: 10}}>
                            {products.data.map((item) =>
                                <Card spacing={4} sx={{padding: 1, maxWidth: 345, boxShadow: '-1px 4px 20px -6px rgba(0, 0, 0, 1.75)'}}>       
                                    <Grid sx={{ height: 50, padding: 0.5 }}>
                                        <Typography variant='h2'>
                                            {item.name}
                                        </Typography>

                                    <Grid container direction="row" justifyContent="flex-end" sx={{ paddingBottom: 10 }}>
                                        {view === true ?
                                        <IconButton size="small"   onClick={() => handleDelete(item.id)}>
                                            <DeleteForeverIcon />
                                        </IconButton>  : ''}

                                    </Grid>
                                    </Grid>
                                    <Grid >
                                        <Typography variant='h3'>
                                            {item.price}
                                        </Typography>  
                                    </Grid>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image='https://mui.com/static/images/cards/paella.jpg'  //   {props.image}
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
                                        <IconButton aria-label="share" component={ActionLink} to="/products/listing">
                                        <UnfoldMoreIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            )} 
                        
                    </Grid>             
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
        </>
    );
}

export default ProductPageExt;



{/* <TableCell align="left"> {view === true ?
    <IconButton size="small" onClick={() => handleDelete(item.id)}>
        <DeleteForeverIcon fontSize="small" />
    </IconButton> : ''}
</TableCell> */}