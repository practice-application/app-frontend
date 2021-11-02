import React, { useEffect, useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DisplayCard } from '../../../components/DisplayCard';
import { imgStorage } from '../../../config';
import { useApi, ProductProvider } from '../../Products/context';

export const CustomerListings = () => {
    return (
        <ProductProvider>
            <Products />
        </ProductProvider>
    );
}

const Products = () => {
    const [{ products }, { deleteProduct, fetchProducts }] = useApi();
    const [imgProducts, setImgProducts] = useState([]);
    const { user } = useAuth0();
    const { sub } = user;
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

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

    const handleDelete = (id) => {
        deleteProduct(id);
    };

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Typography variant="h2" noWrap>My Listings</Typography>

            </Stack>
            {products.data ?
                <>
                    {imgProducts ?
                        <List>
                            {products.data.map((p, i) =>
                                <div key={i}>
                                    {sub === p.auth0id &&
                                        <DisplayCard
                                            title={p.name}
                                            subtitle={p.category}
                                            to={`/products/${p.id}`}
                                            image={p.imgUrl}
                                            key={i}
                                            dataType="small"
                                            onDelete={() => handleDelete(p.id)}
                                            variable="product"
                                        />
                                    }
                                </div>
                            )}
                        </List>
                        :
                        ''
                    }

                </>
                : <Typography>No Listings to show</Typography>
            }
        </>
    )
}