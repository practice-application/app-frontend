import React from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';

export const FileUploader = props => {
    const { children, isDragging, image, errors, onImageUpload, onImageRemoveAll, dragProps } = props;
    const maxNumber = 5;

    return (

        <>
            <Button
                startIcon={isDragging ? <ArrowDownwardIcon /> : <CloudUploadIcon />}
                sx={{ mr: 1 }}
                variant="outlined"
                color={isDragging ? 'success' : undefined}
                onClick={onImageUpload}
                {...dragProps}
            > {image ? "Add Another file" : isDragging ? "Drop File here" : "Upload new File"}
            </Button>
            {image &&
                <Button color="error" variant="outlined" startIcon={<DeleteForeverIcon />} onClick={onImageRemoveAll}>Remove all images</Button>}
            {errors &&
                <Typography variant="body2" color="error">
                    {errors.maxNumber && `Number of selected images exceed ${maxNumber}`}
                    {errors.acceptType && `Your selected file type is not allow`}
                    {errors.maxFileSize && `Selected file size exceed maxFileSize`}
                    {errors.resolution && `Selected file is not match your desired resolution`}
                </Typography>
            }
            {children}
        </>
    )
}
export default FileUploader;
FileUploader.propTypes = {
    onChange: PropTypes.func,
    onImageUpload: PropTypes.func,
    onImageRemoveAll: PropTypes.func,
    children: PropTypes.element,

};