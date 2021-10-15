import React, { useEffect, useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Moment from 'react-moment';
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
    const { user } = useAuth0();
    const { nickname } = user;

    useEffect(() => {
        const fetchImages = async () => {
            const fileLocation = `/product-images/${state.product.imageID}/`
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
    }, [state]);

    const onDelete = async (e) => {
        const resp = await imgStorage.refFromURL(images.splice(e, 1))
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

    const customName = () => {
        if (nickname === product.user) {
            return "Me"
        }
        return (product.user)
    }

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
                        {nickname === product.user &&
                            <Grid item>
                                <Button
                                    variant={view === true ? "contained" : "outlined"}
                                    endIcon={view === true ? <CreateIcon fontSize="small" /> : <CloseIcon fontSize="small" />}
                                    onClick={view === true ? change : changeBack}> {view === true ? "Edit Product" : "Cancel"}</Button>

                            </Grid>
                        }
                    </Grid>
                    <Container maxWidth="sm" sx={{ paddingTop: 10 }}>
                        {view ? (
                            <>
                                <Paper sx={{ my: 1, p: 1 }}>
                                    <CardHeader title={product.name} />
                                    {product.description &&
                                        <>
                                            <ListItem>
                                                {product.description}
                                            </ListItem>
                                            <Divider />
                                        </>
                                    }
                                    <ListItem>
                                        <ListItemText>
                                            Price
                                        </ListItemText> ${product.price}
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText>
                                            Category
                                        </ListItemText> {product.category}
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText>
                                            Created:
                                        </ListItemText>
                                        <Moment fromNow interval={30000} date={product.date} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText>
                                            Seller:
                                        </ListItemText>  {customName()}
                                    </ListItem>
                                </Paper>
                                <ImagePager
                                    maxSteps={maxSteps}
                                    array={images}
                                    image={images[0]}
                                    view
                                    title={`Photos of ${product.name}`}
                                    onDelete={(e) => onDelete(e)}
                                    action={nickname === product.user}
                                />
                                <Paper sx={{ my: 1, p: 1 }}>
                                    <ListItem>
                                        <ListItemText>
                                            Tags
                                        </ListItemText>
                                        <Chip label={<Typography>Label</Typography>} />
                                    </ListItem>
                                </Paper>
                            </>
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