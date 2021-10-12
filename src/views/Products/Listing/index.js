import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";

import { ImagePager } from '../../../components/ImagePager';
import { Trail } from '../../../components/Trail';
import { imgStorage } from '../../../config';
import { ProductProvider, useApi } from '../context';
import Form from './Form'

export const Listing = () => {
    return (
        <ProductProvider>
            <ProductListing />
        </ProductProvider>
    );
}

const ProductListing = () => {
    const [view, setView] = useState(true);
    const [state, { fetchProduct }] = useApi();
    const [product, setProduct] = useState();
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const maxSteps = images.length;

    useEffect(() => {
        const fetchImages = async () => {
            var fileLocation = `/product-images/${id}/`
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
    }, [id]);

    const onDelete = async () => {
        var array = [...images]
        var index = array.indexOf(images)
        const resp = await imgStorage.refFromURL(images.splice(index, 1))
        resp.delete()
        window.location.reload()
    }

    useEffect(() => {
        fetchProduct(id);
    }, [fetchProduct, id]);

    useEffect(() => {
        setProduct(state.product);
    }, [state.product]);

    const change = () => {
        setView(false);
    };
    const changeBack = () => {
        setView(true);
    };

    return (
        <>
            {product &&
                <>
                    <Grid container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Grid item>
                            <Trail pageName="Products" returningPage="/products"
                                currentPage={product.name} />
                        </Grid>
                        <Grid item>
                            <Button
                                variant={view === true ? "contained" : "outlined"}
                                endIcon={view === true ? <CreateIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                                onClick={view === true ? change : changeBack}> {view === true ? "Edit Product" : "Cancel"}</Button>
                        </Grid>
                    </Grid>
                    <Container maxWidth="sm" sx={{ paddingTop: 10 }}>
                        {view ? (
                            <Paper >
                                <Typography variant="h1">
                                    {product.name}
                                </Typography>
                                <Typography >
                                    ${product.price}
                                    <br />
                                    {product.description}
                                </Typography>
                                <ImagePager
                                    maxSteps={maxSteps}
                                    array={images}
                                    image={images[0]}
                                    view
                                    title={`Photos of ${product.name}`}
                                    onDelete={(e) => onDelete(e)}
                                    action
                                />
                            </Paper>
                        ) : (
                            <Form onAction={(changeBack)} />
                        )}

                    </Container>

                </>
            }
        </>
    )
}

export default Listing;