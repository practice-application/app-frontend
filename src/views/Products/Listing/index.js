import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { format, parseISO } from 'date-fns';
import { useParams } from "react-router-dom";

import { Trail } from '../../../components/Trail';
import { ProductProvider, useApi } from '../context';
import { Form } from './Form'
import { ProductCard } from '../ProductCard';

export const Listing = () => {
    return (
        <ProductProvider>
            <ProductCard />
        </ProductProvider>
    );
}

const Customer = () => {
    const [view, setView] = useState(true);
    const [state, { fetchProduct }] = useApi();
    const [product, setProduct] = useState();
    const { id } = useParams();

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
                                onClick={view === true ? change : changeBack}> {view === true ? "Edit Profile" : "Cancel"}</Button>
                        </Grid>
                    </Grid>
                    <Container maxWidth="sm">
                        {view ? (
                            <Card>
                                <Typography variant="h1">
                                    {product.name}
                                </Typography>
                                <Typography >
                                    {product.price}
                                </Typography>
                                <Typography >
                                    {product.description}
                                </Typography>
                            </Card>
                        ) : (
                            <Form onAction={changeBack} />
                        )}
                    </Container>
                </>
            }
        </>
    )
}

export default Listing;