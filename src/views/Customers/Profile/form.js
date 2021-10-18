import React, { useEffect, useState } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { format, parseISO } from 'date-fns';
import * as PropTypes from 'prop-types';

import { Dropdown } from '../../../components/Dropdown'
import { useApi } from '../context';

const steps = ['Basic Info', 'Address'];

export const Form = ({ onAction }) => {
    const [state, { update, create }] = useApi();
    const [person, setPerson] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [submitting, setSubmitting] = useState();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <Grid item xs={2}>
                        <Stepper orientation="vertical" activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </Grid>
                    <Grid item xs={6} >
                        {activeStep === 0 &&
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
                            </>
                        }

                        <React.Fragment>
                            {activeStep === 1 &&
                                <>
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
                                    <TextInput id="region" label="Region"
                                        size="small" variant="outlined" fullWidth
                                        value={person && person.region}
                                        onChange={handleChange}
                                    />
                                    <Dropdown
                                        dataType="country"
                                        value={person && person.country}
                                        onChange={handleChange}
                                        errorMsg={errorMsg} />
                                </>
                            }
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />

                                {activeStep === steps.length - 1 ?
                                    <Button
                                        sx={{ marginTop: 2 }}
                                        variant="contained"
                                        onClick={handleSave}
                                        disabled={!formValid()}
                                    >
                                        {submitting ? <CircularProgress color="inherit" size={24} /> : person.id ? 'Update Person' : 'Create Person'}
                                    </Button> : <Button disabled={!formValid()} onClick={handleNext}>
                                        Next
                                    </Button>}
                            </Box>
                        </React.Fragment>
                    </Grid>
                </Grid>
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