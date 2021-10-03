

// import React, { useEffect, useState, useMemo } from 'react';

// import CheckIcon from '@mui/icons-material/Check';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DatePicker from '@mui/lab/DatePicker';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import Autocomplete from '@mui/material/Autocomplete';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import CircularProgress from "@mui/material/CircularProgress";
// import Grid from '@mui/material/Grid';
// import MenuItem from '@mui/material/MenuItem';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Stepper from '@mui/material/Stepper';
// import { styled } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import { format, parseISO } from 'date-fns';
// import * as PropTypes from 'prop-types';
// import countryList from 'react-select-country-list';

// import { useApi } from '../context';

// const steps = ['Basic Info', 'Address'];

// export const Form = ({ onAction }) => {
//     const [state, { update, create }] = useApi();
//     const [person, setPerson] = useState();
//     const [errorMsg, setErrorMsg] = useState(false);
//     const [submitting, setSubmitting] = useState();
//     const [activeStep, setActiveStep] = useState(0);
//     const [skipped, setSkipped] = useState(new Set());

//     const isStepSkipped = (step) => {
//         return skipped.has(step);
//     };

//     const handleNext = () => {
//         let newSkipped = skipped;
//         if (isStepSkipped(activeStep)) {
//             newSkipped = new Set(newSkipped.values());
//             newSkipped.delete(activeStep);
//         }

//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped(newSkipped);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const validEmail = () => {
//         let isValid = true;
//         const emailRegex = /\S+@\S+/
//         if (typeof person.email !== 'undefined') {
//             if (!emailRegex.test(person.email)) {
//                 isValid = false;
//                 setErrorMsg('Please enter a valid email address');
//             }
//             return isValid;
//         }
//     }

//     const handleSave = () => {
//         console.log(person)
//         if (validEmail()) {
//             setErrorMsg(null);
//             setSubmitting(true);
//             if (person.id) {
//                 update(person)
//             } else {
//                 create(person)
//             }
//             onAction()
//             setSubmitting(false);
//         }
//     };


//     const formValid = () => {
//         if (!person.email) {
//             return false;
//         }
//         for (var err in person.errors) {
//             if (person.errors[err]) {
//                 return false;
//             }
//         }
//         return true;
//     };

//     useEffect(() => {
//         setPerson(state.person);
//     }, [state.person]);

//     const options = useMemo(() => countryList().getData(), []);
//     const handleChange = (e) => {
//         const key = e.target.id;
//         const val = e.target.value;
//         console.log(val)

//         setPerson(prev => {
//             prev[key] = val;
//             return { ...prev };
//         });

//     }

//     return (
//         <>
//             {person &&
//                 <Grid
//                     container
//                     direction="row"
//                     justifyContent="center"
//                     alignItems="flex-start"
//                 >
//                     <Grid item xs={2}>
//                         <Stepper orientation="vertical" activeStep={activeStep}>
//                             {steps.map((label, index) => {
//                                 const stepProps = {};
//                                 const labelProps = {};
//                                 if (isStepSkipped(index)) {
//                                     stepProps.completed = false;
//                                 }
//                                 return (
//                                     <Step key={label} {...stepProps}>
//                                         <StepLabel {...labelProps}>{label}</StepLabel>
//                                     </Step>
//                                 );
//                             })}
//                         </Stepper>
//                     </Grid>
//                     <Grid item xs={6} >
//                         {activeStep === 0 &&
//                             <>
//                                 <Grid container spacing={1}>
//                                     <Grid item xs={6}>
//                                         <TextInput id="firstName" label="First Name"
//                                             size="small" variant="outlined" fullWidth
//                                             value={person && person.firstName}
//                                             onChange={handleChange}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={6} >
//                                         <TextInput id="lastName" label="Last Name"
//                                             size="small" variant="outlined" fullWidth
//                                             value={person && person.lastName}
//                                             onChange={handleChange}
//                                         />

//                                     </Grid>
//                                 </Grid>
//                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                     <DatePicker
//                                         id="birthDate"
//                                         label="Date of Birth"
//                                         onChange={e => handleChange({ target: { id: "birthDate", value: format(e, 'yyyy-MM-dd') } })}
//                                         value={person && parseISO(person.birthDate)}
//                                         renderInput={(params) =>
//                                             <TextInput id="birthDate" size="small" variant="outlined" fullWidth {...params} />
//                                         }
//                                     />
//                                 </LocalizationProvider>
//                                 <TextInput id="email" label="Email Address"
//                                     size="small" variant="outlined" fullWidth
//                                     value={person && person.email}
//                                     onChange={handleChange}
//                                     error={Boolean(errorMsg)}
//                                     helperText={errorMsg}
//                                 />
//                                 <TextInput id="phone" label="Phone Number"
//                                     size="small" variant="outlined" fullWidth type="number"
//                                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
//                                     value={person && person.phone}
//                                     onChange={handleChange}
//                                 />
//                             </>
//                         }

//                         <React.Fragment>
//                             {activeStep === 1 &&
//                                 <>
//                                     <TextInput id="addressLine1" label="Address"
//                                         size="small" variant="outlined" fullWidth
//                                         value={person && person.addressLine1}
//                                         onChange={handleChange}
//                                     />
//                                     <TextInput id="addressLine2" label="Secondary Address"
//                                         size="small" variant="outlined" fullWidth
//                                         value={person && person.addressLine2}
//                                         onChange={handleChange}
//                                     />
//                                     <Grid container spacing={1}>
//                                         <Grid item xs={6}>
//                                             <TextInput id="suburb" label="Suburb"
//                                                 fullWidth
//                                                 size="small" variant="outlined"
//                                                 value={person && person.suburb}
//                                                 onChange={handleChange}
//                                             />
//                                         </Grid>
//                                         <Grid item xs={6} >
//                                             <TextInput id="city" label="City"
//                                                 size="small" variant="outlined" fullWidth
//                                                 value={person && person.city}
//                                                 onChange={handleChange}
//                                             />
//                                         </Grid>
//                                     </Grid>
//                                     <TextInput id="region" label="Region"
//                                         size="small" variant="outlined" fullWidth
//                                         value={person && person.region}
//                                         onChange={handleChange}
//                                     />
//                                     <Autocomplete
//                                         id="country"
//                                         onChange={(e, val) => handleChange({ target: { id: "country", value: val } })}
//                                         getOptionLabel={options.label}
//                                         value={person && person.country}
//                                         options={options.map((option) => option.label)}
//                                         isOptionEqualToValue={(option, val) => option === val}
//                                         renderInput={(params) => <TextInput size="small" id="country" variant="outlined" label="Country" fullWidth {...params} />}
//                                         renderOption={(props, option, { selected }) => (
//                                             <MenuItem key={option} {...props}>
//                                                 {option}{selected && <CheckIcon sx={{ color: 'success.main', pl: 1 }} />}
//                                             </MenuItem>
//                                         )
//                                         }
//                                     />
//                                     {errorMsg && <Typography variant="body2">{errorMsg}</Typography>}
//                                 </>
//                             }
//                             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                                 <Button
//                                     color="inherit"
//                                     disabled={activeStep === 0}
//                                     onClick={handleBack}
//                                     sx={{ mr: 1 }}
//                                 >
//                                     Back
//                                 </Button>
//                                 <Box sx={{ flex: '1 1 auto' }} />

//                                 {activeStep === steps.length - 1 ?
//                                     <Button
//                                         sx={{ marginTop: 2 }}
//                                         variant="contained"
//                                         onClick={handleSave}
//                                         disabled={!formValid()}
//                                     >
//                                         {submitting ? <CircularProgress size={24} /> : person.id ? 'Update Person' : 'Create Person'}
//                                     </Button> : <Button disabled={!formValid()} onClick={handleNext}>
//                                         Next
//                                     </Button>}
//                             </Box>
//                         </React.Fragment>
//                     </Grid>
//                 </Grid>
//             }
//         </>
//     )
// }

// const TextInput = styled(TextField)(({ theme }) => ({
//     marginTop: theme.spacing(2),
// }));

// Form.propTypes = {
//     onAction: PropTypes.func,
// };













import React, { useEffect, useState } from 'react';

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

import { useApi } from '../context';

export const Form = ({ onAction }) => {
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
    console.log(image)



    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

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



    const handleChange = (e, imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);

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
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (

                                    <>
                                        <Button
                                            startIcon={<CloudUploadIcon />}
                                            variant="outlined"
                                            color={isDragging ? 'success' : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            Add an Image
                                        </Button>

                                        <Button color="error" variant="outlined" startIcon={<DeleteForeverIcon />} onClick={onImageRemoveAll}>Remove all images</Button>
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
                                                    <Button onClick={() => onImageUpdate(index)}>Update</Button>
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

const TextInput = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

Form.propTypes = {
    onAction: PropTypes.func,
};