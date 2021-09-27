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
                        {/* 2006-01-02 */}
                        <DatePicker
                            id="age"
                            label="Date of Birth"
                            onChange={e => handleChange({ target: { id: "age", value: format(e, 'yyyy-MM-dd') } })}
                            value={person && parseISO(person.age)}
                            renderInput={(params) =>
                                <TextInput id="age" size="small" variant="outlined" fullWidth {...params} />
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
                    <TextInput id="addressLine1" label="Address Line 1"
                        size="small" variant="outlined" fullWidth
                        value={person && person.address.addressLine1}
                        onChange={handleChange}
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