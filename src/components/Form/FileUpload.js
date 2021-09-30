import React from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const FileUpload = props => {
    const { accept, onChange, title, variant } = props;


    const handleChange = event => {
        const f = event.target.files;
        if (f.length === 0) {
            onChange(null);
        } else {
            onChange(f[0]);
        }
    };

    return (
        <Box>
            <input
                accept={accept || '.xlsx,.xls,image/*,.doc,.docx,.txt,.rtf,.pdf'}
                style={{ display: 'none', }}
                id="file-upload"
                type="file"
                onChange={handleChange}
            />
            <label htmlFor="file-upload">
                <Button
                    sx={{ height: '100%' }}
                    variant={variant || 'outlined'}
                    component="span"
                    startIcon={<CloudUploadIcon />}
                >
                    {title || 'Upload'}
                </Button>
            </label>
        </Box>
    );
};

export default FileUpload;