import React, { useEffect, useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';
import { v4 as uuidv4 } from 'uuid';

import { Dropdown } from '../../../components/Dropdown'
import { FileUploader } from '../../../components/FileUploader';
import { ImagePager } from '../../../components/ImagePager';
import { imgStorage } from '../../../config';
import { useApi } from '../context';

export const Form = ({ onAction }) => {

    const [state, { update, create }] = useApi();
    const [product, setProduct] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [submitting, setSubmitting] = useState();
    const [image, setImages] = useState([]);
    const [message, setMessage] = useState();
    const [setID] = useState(uuidv4());
    const maxSteps = image.length;
    const maxNumber = 5
    const { user } = useAuth0();
    const { nickname } = user;

    const validPrice = () => {
        let isValid = true;
        const priceRegex = /^(\$|)([1-9]\d{0,2}(\d{3})*|([1-9]\d*))(\.\d{2})?$/;
        if (typeof product.price !== 'undefined') {
            if (!priceRegex.test(product.price)) {
                isValid = false;
                setErrorMsg('Please enter a valid price');
            }
            return isValid;
        }
    }

    const imageUpload = async () => {
        image[0] && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image[0].file.name}`).put(image[0].file)
        image[1] && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image[1].file.name}`).put(image[1].file)
        image[2] && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image[2].file.name}`).put(image[2].file)
        image[3] && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image[3].file.name}`).put(image[3].file)
        image[4] && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image[4].file.name}`).put(image[4].file)
    }

    const onChange = (imageList) => {
        setImages(imageList);
        console.log(imageList.map((item) => item.file.name))
    }

    const handleSave = () => {
        if (validPrice()) {
            setErrorMsg(null);
            setSubmitting(true);
            if (product.id) {
                update(product)
                if (image[0]) {
                    imageUpload()
                }
                onAction()
                setSubmitting(false);
                window.location.reload()
            } else {
                if (image[0]) {
                    product.imageID = setID
                    product.user = nickname
                    create(product)
                    imageUpload()
                    onAction()
                    setSubmitting(false);
                }
                else {
                    setSubmitting(false);
                    setMessage(true)
                }
            }
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
                        <Grid item xs={12}>
                            <TextInput id="name" label="Name"
                                size="small" variant="outlined" fullWidth
                                value={product && product.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextInput id="price" label="Price"
                                type="number"
                                InputProps={{
                                    startAdornment: "$", inputMode: 'numeric', pattern: '[0-9]*'
                                }}
                                size="small" variant="outlined" fullWidth
                                value={product && product.price}
                                onChange={handleChange}
                                error={Boolean(errorMsg)}
                                helperText={errorMsg}
                            />
                            <Dropdown
                                dataType="categories"
                                value={product && product.category}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput id="description" label="Description"
                                size="small" variant="outlined" multiline minRows='8' fullWidth
                                value={product && product.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ImageUploading
                                accept={'.xlsx,.xls,image/*,.doc,.docx,.txt,.rtf,.pdf'}
                                multiple
                                value={image}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (
                                    <FileUploader
                                        maxNumber={maxNumber}
                                        image={image[0]}
                                        dragProps={dragProps}
                                        errors={errors}
                                        isDragging={isDragging}
                                        onChange={onChange}
                                        onImageRemoveAll={onImageRemoveAll}
                                        onImageUpload={onImageUpload}>
                                        <ImagePager
                                            upload
                                            action
                                            maxSteps={maxSteps}
                                            array={imageList}
                                            image={image[0]}
                                            onChange={onImageUpdate}
                                            onDelete={onImageRemove}
                                        />
                                    </FileUploader>
                                )}
                            </ImageUploading>
                            {message && <Typography color="error.main">A minimum of 1 image is required before submission</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <Dropdown
                                dataType="tags"
                                value={product && product.tags.map((item) => item)}
                                onChange={handleChange}
                                tags />
                        </Grid>
                    </Grid>
                    <Button
                        sx={{ marginTop: 2 }}
                        variant="contained"
                        onClick={handleSave}
                        disabled={!formValid()}
                    >
                        {submitting ? <CircularProgress size={24} color="inherit" /> : product.id ? 'Update Product' : 'Create Product'}
                    </Button>
                </>
            }
        </>
    )
}
export default Form;

const TextInput = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

Form.propTypes = {
    onAction: PropTypes.func,
};