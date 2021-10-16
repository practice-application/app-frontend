import React, { useEffect, useState, useMemo } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import CheckIcon from '@mui/icons-material/Check';
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from "@mui/material/CircularProgress";
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';
import { v4 as uuidv4 } from 'uuid';

import { FileUploader } from '../../../components/FileUploader';
import { ImagePager } from '../../../components/ImagePager';
import { imgStorage } from '../../../config';
import { useApi } from '../context';
import { ProductCategories, Empty } from '../ProductCategories'

export const Form = ({ onAction }) => {

    const [state, { update, create }] = useApi();
    const [product, setProduct] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [submitting, setSubmitting] = useState();
    const [image, setImages] = useState([]);
    const [message, setMessage] = useState();
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

    const onChange = (imageList) => {
        setImages(imageList);
    }

    let setID = uuidv4()
    const handleSave = async () => {
        if (validPrice()) {
            setErrorMsg(null);
            setSubmitting(true);
            if (product.id) {
                update(product)
                if (image[0]) {
                    await imgStorage.ref(`/product-images/${product.imageID}/${product.name + ", " + product.user}`).put(image[0].file)
                }
                onAction()
                setSubmitting(false);
                window.location.reload()
            } else {
                if (image[0]) {
                    create(product)
                    await imgStorage.ref(`/product-images/${product.imageID = setID}/${product.name + ", " + (product.user = nickname)}`).put(image[0].file)
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

    const options = useMemo(() => ProductCategories, []);
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
                            <Autocomplete
                                onChange={(e, val) => handleChange({ target: { id: "category", value: val } })}
                                id="category"
                                getOptionLabel={ProductCategories.label}
                                value={product && product.category}
                                options={options.map((option) => option.label)}
                                isOptionEqualToValue={(option, val) => option === val}
                                renderInput={(params) => <TextInput {...params} id="category" size="small" variant="outlined" fullWidth label="Category" />}
                                renderOption={(props, option, { selected }) => (
                                    <MenuItem key={option} {...props}>
                                        {option}{selected && <CheckIcon sx={{ color: 'success.main', pl: 1 }} />}
                                    </MenuItem>
                                )
                                }

                            />
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
                            <Autocomplete
                                onChange={(e, val) => handleChange({ target: { id: "tags", value: val } })}
                                multiple
                                isOptionEqualToValue={(option, val) => option === val}
                                id="tags"
                                value={product && product.tags.map((item) => item)}
                                options={Empty}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip label={<Typography>{option}</Typography>} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextInput
                                        {...params}
                                        id="tags" size="small" variant="outlined" fullWidth label="Tags" helperText="Please create 5 tags"
                                    />
                                )}
                            />
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

