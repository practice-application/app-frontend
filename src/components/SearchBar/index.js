import React, { useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange }) => {
    const [term, setTerm] = useState(value || "");
    // const [timer, setTimer] = useState(null);

    const triggerOnChange = () => {
        onChange(term);
        // setTimer(null);
    };

    const handleChange = event => {
        setTerm(event.target.value);
        //timer && clearTimeout(timer);
        //setTimer(setTimeout(() => triggerOnChange(), 3000));
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