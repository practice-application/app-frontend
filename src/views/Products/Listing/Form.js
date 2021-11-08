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
import { ref, uploadBytes } from "firebase/storage";
import * as PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Dropdown } from '../../../components/Dropdown'
import { FileUpload } from '../../../components/FileUpload';
import { ImagePager } from '../../../components/ImagePager';
import { imgStorage } from '../../../config'
import { useApi } from '../context';

export const Form = ({ onAction }) => {
    const [state, { update, create }] = useApi();
    const [product, setProduct] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [submitting, setSubmitting] = useState();
    const [image, setImage] = useState([]);
    const [imageURLS, setImageURLS] = useState([]);
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

    useEffect(() => {
        if (image.length < 1) return;
        const newImageUrls = [];
        image.forEach(i => newImageUrls.push(URL.createObjectURL(i)))
        setImageURLS(newImageUrls)
    }, [image])

    const handleInput = (e) => {
        setImage([...e.target.files])
        image.forEach(i => i.name)
        setSelected(true);
    };

    const imageUpload = async () => {
        const metadata = {
            contentType: 'image/jpeg',
        };
        const path = `/product-images/${product.imageID}`
        const images = ref(imgStorage, `${path}/${product.name + '-' + image[0]}`);
        uploadBytes(await images, image[0], metadata)
    }

    console.log(image.length)
    console.log(imageURLS.length)

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
                        </Grid>
                        <Grid item xs={12}>
                            {Selected &&
                                <>
                                    <ImagePager
                                        title={image.map(item => item.name)}
                                        upload
                                        maxSteps={maxSteps}
                                        array={imageURLS}
                                        image={imageURLS[0]}
                                    />

                                </>

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