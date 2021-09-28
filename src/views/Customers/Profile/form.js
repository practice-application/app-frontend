import React, { useEffect, useState, useMemo } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { format, parseISO } from 'date-fns';
import * as PropTypes from 'prop-types';
import countryList from 'react-select-country-list';

import { useApi } from '../context';

export const Form = ({ onAction }) => {
    const [state, { update, create }] = useApi();
    const [person, setPerson] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [submitting, setSubmitting] = useState();

    const validEmail = () => {
        let isValid = true;
        const emailRegex = /\S+@\S+/
        if (typeof person.email !== 'undefined') {
            if (!emailRegex.test(person.email)) {
                isValid = false;
                setErrorMsg('Please enter a valid email address');
            }
            return isValid;
        }
    }

    const handleSave = () => {
        console.log(person)
        if (validEmail()) {
            setErrorMsg(null);
            setSubmitting(true);
            if (person.id) {
                update(person)
            } else {
                create(person)
            }
            onAction()
            setSubmitting(false);
        }
    };


    const formValid = () => {
        if (!person.email) {
            return false;
        }
        for (var err in person.errors) {
            if (person.errors[err]) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        setPerson(state.person);
    }, [state.person]);

    const options = useMemo(() => countryList().getData(), []);
    const handleChange = (e) => {
        const key = e.target.id;
        const val = e.target.value;

        setPerson(prev => {
            prev[key] = val;
            return { ...prev };
        });

    }



    return (
        <>
            {person &&
                <>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextInput id="firstName" label="First Name"
                                size="small" variant="outlined" fullWidth
                                value={person && person.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TextInput id="lastName" label="Last Name"
                                size="small" variant="outlined" fullWidth
                                value={person && person.lastName}
                                onChange={handleChange}
                            />

                        </Grid>
                    </Grid>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {/* <DatePicker
                            // views={person ? '' : ['day', 'month', 'year']}
                            id="birthDate"
                            label="Date of Birth"
                            onChange={e => handleChange({ target: { id: "birthDate", value: person ? format(e, 'yyyy-MM-dd') : e } })}
                            value={person ? parseISO(person.birthDate) : person.birthDate}

                            renderInput={(params) =>
                                <TextInput id="birthDate" size="small" variant="outlined" fullWidth {...params} />
                            }
                        /> */}
                        <DatePicker
                            id="birthDate"
                            label="Date of Birth"
                            onChange={e => handleChange({ target: { id: "birthDate", value: format(e, 'yyyy-MM-dd') } })}
                            value={person && parseISO(person.birthDate)}
                            renderInput={(params) =>
                                <TextInput id="birthDate" size="small" variant="outlined" fullWidth {...params} />
                            }
                        />
                    </LocalizationProvider>
                    <TextInput id="email" label="Email Address"
                        size="small" variant="outlined" fullWidth
                        value={person && person.email}
                        onChange={handleChange}
                        error={Boolean(errorMsg)}
                        helperText={errorMsg}
                    />
                    <TextInput id="phone" label="Phone Number"
                        size="small" variant="outlined" fullWidth type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={person && person.phone}
                        onChange={handleChange}
                    />
                    <TextInput id="addressLine1" label="Address"
                        size="small" variant="outlined" fullWidth
                        value={person && person.addressLine1}
                        onChange={handleChange}
                    />
                    <TextInput id="addressLine2" label="Secondary Address"
                        size="small" variant="outlined" fullWidth
                        value={person && person.addressLine2}
                        onChange={handleChange}
                    />
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextInput id="suburb" label="Suburb"
                                fullWidth
                                size="small" variant="outlined"
                                value={person && person.suburb}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TextInput id="city" label="City"
                                size="small" variant="outlined" fullWidth
                                value={person && person.city}
                                onChange={handleChange}
                            />

                        </Grid>
                    </Grid>
                    <Autocomplete
                        id="country"
                        label="Country"
                        onChange={e => handleChange({ target: { id: "country", value: e } })}
                        getOptionLabel={options.label}
                        // value={person ? person.country : options.label}
                        filterOptions={(x) => x}
                        options={options.map((option) => option.label)}
                        defaultValue={person && person.country}
                        // renderTags={(value, getTagProps) =>
                        //     value.map((option, index) => (
                        //         <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        //     ))
                        // }
                        isOptionEqualToValue={(option, e) => option.code === e}
                        renderInput={(params) => <TextInput size="small" id="country" variant="outlined" fullWidth {...params} label="Country" />}
                    />
                    <Button
                        sx={{ marginTop: 2 }}
                        variant="contained"
                        onClick={handleSave}
                        disabled={!formValid()}
                    >
                        {submitting ? <CircularProgress size={24} /> : person.id ? 'Update Person' : 'Create Person'}
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


const App = () => {
    const civilities = ["Mr", "Ms", "Other"];
    const [values, setValues] = useState({
        civility: "Ms"
    });

    const handleBlur = (e) => {
        console.log("Blur:", e.target.value);
    };

    const setFieldValue = (type, value) => {
        setValues((oldValues) => ({ ...oldValues, [type]: value }));
    };

    return (
        <>
            {({ errors, touched }) => (

                <Autocomplete
                    error={Boolean(touched.civility && errors.civility)}
                    helperText={touched.civility && errors.civility}
                    label="Civility"
                    margin="normal"
                    name="civility"
                    onBlur={handleBlur}
                    onChange={(e, value) => setFieldValue("civility", value)}
                    options={civilities}
                    value={values.civility}
                    isOptionEqualToValue={(option, value) => option.code === value}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Civility" />
                    )}
                />

            )}
        </>
    );
}