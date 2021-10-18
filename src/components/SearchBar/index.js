import React, { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';

export const SearchBar = ({ value, onChange }) => {
    const [term, setTerm] = useState(value || "");

    const triggerOnChange = () => {
        onChange(term);
    };

    const handleChange = event => {
        setTerm(event.target.value);
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            triggerOnChange();
        }
    };

    const handleClear = () => {
        setTerm("");
        onChange("");
    }

    return (
        <FormControl fullWidth >
            <OutlinedInput
                sx={{ borderRadius: '4rem' }}
                id="search"
                color="secondary"
                size="small"
                value={term}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon fontSize="default" />
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <ClearIcon fontSize="small" onClick={handleClear}
                            sx={{ cursor: 'pointer' }} />
                    </InputAdornment>
                }
                data-cy="search-input"
            />
        </FormControl>
    );
};

SearchBar.defaultProps = {
    value: "",
    onChange: () => { },
};

SearchBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default SearchBar;