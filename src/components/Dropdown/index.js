import React, { useMemo } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import countryList from 'react-select-country-list';

export const Dropdown = props => {
    const { value, onChange, errorMsg, tags } = props
    switch (props.dataType) {
        case 'country':
            return <Country value={value} onChange={onChange} errorMsg={errorMsg} />
        case 'tags':
            return <Tags value={value} onChange={onChange} tags={tags} />
        case 'categories':
            return <ProductCategory value={value} onChange={onChange} />
        default:
            throw new Error('Invalid dataType prop passed to Dropdown');
    }
}


const Tags = props => {
    const { value, onChange, tags } = props
    return (
        <Autocomplete
            onChange={(e, val) => onChange({ target: { id: "tags", value: val } })}
            multiple={tags}
            isOptionEqualToValue={(option, val) => option === val}
            id="tags"
            value={value}
            options={Empty}
            freeSolo={tags}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip label={<Typography>{option}</Typography>} {...getTagProps({ index })} />
                ))
            }
            renderInput={(params) => (
                <TextInput
                    {...params}
                    id="tags" size="small" variant="outlined" fullWidth label="Tags" helperText="Please create 5 tags"
                />
            )}
        />)
}

const Country = props => {
    const { value, onChange, errorMsg } = props
    const options = useMemo(() => countryList().getData(), []);

    return (
        <>
            <Autocomplete
                id="country"
                onChange={(e, val) => onChange({ target: { id: "country", value: val } })}
                getOptionLabel={options.label}
                value={value}
                options={options.map((option) => option.label)}
                isOptionEqualToValue={(option, val) => option === val}
                renderInput={(params) => <TextInput size="small" id="country" variant="outlined" label="Country" fullWidth {...params} />}
                renderOption={(props, option, { selected }) => (
                    <MenuItem key={option} {...props}>
                        {option}{selected && <CheckIcon sx={{ color: 'success.main', pl: 1 }} />}
                    </MenuItem>
                )
                }
            />
            {errorMsg && <Typography variant="body2">{errorMsg}</Typography>}
        </>
    )
}

const ProductCategory = props => {
    const { value, onChange } = props
    const options = useMemo(() => ProductCategories, []);
    return (<Autocomplete
        onChange={(e, val) => onChange({ target: { id: "category", value: val } })}
        id="category"
        getOptionLabel={ProductCategories.label}
        value={value}
        options={options.map((option) => option.label)}
        isOptionEqualToValue={(option, val) => option === val}
        renderInput={(params) => <TextInput {...params} id="category" size="small" variant="outlined" fullWidth label="Category" />}
        renderOption={(props, option, { selected }) => (
            <MenuItem key={option} {...props}>
                {option}{selected && <CheckIcon sx={{ color: 'success.main', pl: 1 }} />}
            </MenuItem>
        )
        }

    />
    )
}
const TextInput = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));


const ProductCategories = [
    { label: 'Technology & Electronics' },
    { label: 'Music' },
    { label: 'Books' },
    { label: 'Services' },
    { label: `Clothing, Men's` },
    { label: `Clothing, Women` },
    { label: `Clothing, children's` },
    { label: 'Vehicles' },
    { label: 'Toys & Games' },
    { label: 'Hobbies' },
    { label: 'Gaming' },
    { label: 'Homeware' },
    { label: 'Movies & Entertainment' },
    { label: 'Food & Drink' },
    { label: 'Toiletries' },
    { label: 'Office' },
    { label: 'Furniture' },
    { label: 'Misc' },
    { label: 'Replicas' },
    { label: 'Pet care' },
    { label: 'Jewelery & Accessories' },
    { label: 'Sports & Recreation' },
]

const Empty = [

]

Dropdown.propTypes = {
    onChange: PropTypes.func,
    tags: PropTypes.bool,
};