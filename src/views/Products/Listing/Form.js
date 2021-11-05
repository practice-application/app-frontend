import React, { useEffect, useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react"
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Dropdown } from '../../../components/Dropdown'
import { FileUpload } from '../../../components/FileUpload';
import { ImagePager } from '../../../components/ImagePager';
import { useApi } from '../context';

export const Form = ({ onAction }) => {
    const [state, { update, create }] = useApi();
    const [product, setProduct] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [submitting, setSubmitting] = useState();
    const [image, setImage] = useState([]);
    const [Selected, setSelected] = useState(false);
    const [message, setMessage] = useState();
    const [setID] = useState(uuidv4());
    const maxSteps = image.length;
    const { user } = useAuth0();
    const { nickname, picture, sub } = user;

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

    const handleInput = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            Promise.all(files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }));
            }))
                .then(images => {
                    setImage(images)
                }, error => {
                    console.error(error);
                });
        }
        console.log(e.target.files)
        setSelected(true);
    };

    const imageUpload = async () => {
        // image && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image}`).put(image)
        // image[1] && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image[1].file.name}`).put(image[1].file)
        // image[2] && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image[2].file.name}`).put(image[2].file)
        // image[3] && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image[3].file.name}`).put(image[3].file)
        // image[4] && await imgStorage.ref(`/product-images/${product.imageID}/${product.name + "-" + image[4].file.name}`).put(image[4].file)
    }

    const handleSave = () => {
        if (validPrice()) {
            setErrorMsg(null);
            setSubmitting(true);
            if (product.id) {
                update(product)
                product.auth0id = sub
                product.userPic = picture
                if (image[0]) {
                    imageUpload()
                }
                onAction()
                setSubmitting(false);
                window.location.reload()
            } else {
                if (image[0]) {
                    product.auth0id = sub
                    product.imageID = setID
                    product.userPic = picture
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
        const t = e.target.name;
        const c = e.target.checked;
        setProduct((prev) => {
            prev[key] = val
            prev[t] = c
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

                            {product.category.includes('Clothing') &&
                                <Dropdown
                                    dataType="size"
                                    value={product && product.size}
                                    onChange={handleChange}
                                />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput id="description" label="Description"
                                size="small" variant="outlined" multiline minRows='8' fullWidth
                                value={product && product.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FileUpload onChange={handleInput} title={Selected ? 'Change Files' : "Upload new File"} />
                            {Selected &&
                                <ImagePager
                                    upload
                                    action
                                    maxSteps={maxSteps}
                                    array={image}
                                    image={image[0]}
                                />
                            }
                            {message && <Typography color="error.main">A minimum of 1 image is required before submission</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <Dropdown
                                dataType="tags"
                                value={product && product.tags.map((item) => item)}
                                onChange={handleChange}
                                tags />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                value="end"
                                control={<Switch name="priority" checked={product && product.priority === true} onChange={handleChange} />}
                                label={`${product && product.priority === false ? 'Standard' : 'Priority'} sale selected`}
                                labelPlacement="end"
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