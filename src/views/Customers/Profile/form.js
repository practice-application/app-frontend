import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
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
                            <TextField id="firstName" label="First Name"
                                size="small" variant="outlined" fullWidth
                                value={person && person.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TextField id="lastName" label="Last Name"
                                size="small" variant="outlined" fullWidth
                                value={person && person.lastName}
                                onChange={handleChange}
                            />

                        </Grid>
                    </Grid>
                    <TextInput id="age" label="Age"
                        size="small" variant="outlined" fullWidth
                        value={person && person && person.age}
                        onChange={handleChange}
                    />
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
                    <Button
                        sx={{ marginTop: 2 }}
                        variant="contained"
                        onClick={handleSave}
                        disabled={!formValid()}
                    >
                        {submitting ? <CircularProgress size={24} /> : 'Update person'}
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