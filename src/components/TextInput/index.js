import React from 'react';

import TextField from '@mui/material/TextField';

export const TextInput = props => {

    return (
        <TextField
            value={props.value}
            id={props.id}
            label={props.label}
            size="small"
            variant="outlined"
            fullWidth
            error={props.error}
            sx={{ marginTop: 2, }}
            helperText={props.errorMessage}
            onChange={props.onChange}
            type={props.type}
        />
    )
}