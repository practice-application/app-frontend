import React, { useEffect, useState } from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from "@mui/material/CircularProgress";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';

import { imgStorage } from '../../../config';
import { useApi } from '../context';

const Form = ({ onAction }) => {
    const [state, { update, create }] = useApi();
    const [product, setProduct] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [submitting, setSubmitting] = useState();
    const [image, setImages] = useState([]);
    const maxNumber = 5;

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
    };

    const handleSave = () => {
        if (validPrice()) {
            setErrorMsg(null);
            setSubmitting(true);
            if (product.id) {
                update(product)
                imgStorage.ref(`/product-images/${product.id}/${product.name && image[0].file.name}`).put(image)

            } else {
                create(product)
                imgStorage.ref(`/product-images/${product.id}/${product.name && image[0].file.name}`).put(image)
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
                                multiple
                                value={image}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (

                                    <>
                                        {console.log(imageList)}
                                        <Button
                                            startIcon={isDragging ? <ArrowDownwardIcon /> : <CloudUploadIcon />}
                                            sx={{ mr: 1 }}
                                            variant="outlined"
                                            color={isDragging ? 'success' : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            {isDragging ? "Drop here please" : "Upload new File"}
                                        </Button>
                                        <Button color="error" variant="outlined" startIcon={<DeleteForeverIcon />} onClick={onImageRemoveAll}>Remove all images</Button>
                                        {errors &&
                                            <>
                                                {errors.maxNumber && <Typography variant="body2" color="error">Number of selected images exceed {maxNumber}</Typography>}
                                                {errors.acceptType && <Typography variant="body2" color="error">Your selected file type is not allow</Typography>}
                                                {errors.maxFileSize && <Typography variant="body2" color="error">Selected file size exceed maxFileSize</Typography>}
                                                {errors.resolution && <Typography variant="body2" color="error">Selected file is not match your desired resolution</Typography>}
                                            </>
                                        }
                                        {imageList.map((image, index) => (
                                            <Card key={index} >
                                                <CardMedia
                                                    component="img"
                                                    height="190"
                                                    image={image.data_url}
                                                    alt={image.file.name}
                                                />
                                                <CardContent>
                                                    <Typography variant="body2">{image.file.name}</Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button onClick={() => onImageUpdate(index)}>Change</Button>
                                                    <IconButton onClick={() => onImageRemove(index)}><CloseIcon /></IconButton>
                                                </CardActions>
                                            </Card>
                                        ))}
                                    </>
                                )}

                            </ImageUploading>
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
export default Form;

const TextInput = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

Form.propTypes = {
    onAction: PropTypes.func,
};