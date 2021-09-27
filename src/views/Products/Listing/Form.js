import React, { useEffect, useState } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { format, parseISO } from 'date-fns';
import * as PropTypes from 'prop-types';

import { useApi } from '../context';

export const Form = ({ onAction }) => {
    const [state, { update, create }] = useApi();
    const [product, setProduct] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [submitting, setSubmitting] = useState();

    const validPrice = () => {
        let isValid = true;
        const emailRegex = /\S+@\S+/
        if (typeof product.email !== 'undefined') {
            if (!emailRegex.test(product.email)) {
                isValid = false;
                setErrorMsg('Please enter a valid email address');
            }
            return isValid;
        }
    }

    const handleSave = () => {
        console.log(product)
        if (validPrice()) {
            setErrorMsg(null);
            setSubmitting(true);
            if (product.id) {
                update(product)
            } else {
                create(product)
            }
            onAction()
            setSubmitting(false);
        }
    };

    const formValid = () => {
        if (!product.price) {
            return false;
        }
        for (var err in product.errors) {
            if (product.errors[err]) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        setProduct(state.product);
    }, [state.product]);


    const handleChange = (e) => {
        const key = e.target.id;
        const val = e.target.value;

        setProduct(prev => {
            prev[key] = val;
            return { ...prev };
        });
    }

    return (
        <>
            {product &&
                <>
                    <Grid container direction='column' spacing={1}>
                        <Grid item xs={6}>
                            <TextInput id="name" label="Name"
                                size="small" variant="outlined" fullWidth
                                value={product && product.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TextInput id="price" label="Price"
                                size="small" variant="outlined" fullWidth
                                value={product && product.price}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput id="description" label="Description"
                        size="small" variant="outlined" multiline='true' minRows='8' fullWidth
                        value={product && product.description}
                        onChange={handleChange}
                        error={Boolean(errorMsg)}
                        helperText={errorMsg}
                    />
                        </Grid>
                    </Grid>
                    <Button
                        sx={{ marginTop: 2 }}
                        variant="contained"
                        onClick={handleSave}
                        disabled={!formValid()}
                    >
                        {submitting ? <CircularProgress size={24} /> : product.id ? 'Update Product' : 'Create Product'}
                    </Button>
                </>
            }
        </>
    )
}

const TextInput = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

Form.propTypes = {
    onAction: PropTypes.func,
};