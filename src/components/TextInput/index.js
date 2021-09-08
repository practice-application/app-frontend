import React from 'react';

import TextField from '@material-ui/core/TextField';

export const TextInput = props => {

    return (
        <TextField
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