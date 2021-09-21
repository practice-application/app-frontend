import React from 'react';

import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

export const TextInput = props => {
    const { id, value, onChange, startAdornment, helperText, label, error, type, errorMessage } = props;



    return (
        <>
            <TextField
                value={value}
                id={id}
                label={label}
                size="small"
                helperText={errorMessage}
                variant="outlined"
                fullWidth
                error={error}
                sx={{ marginTop: 2, }}
                onChange={onChange}
                type={type}
                InputProps={startAdornment && {
                    startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
                }}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </>);

}