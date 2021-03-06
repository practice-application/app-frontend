import React, { useMemo } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import countryList from 'react-select-country-list';


export const Dropdown = props => {
    const { value, onChange, errorMsg, tags, dataType } = props

    switch (dataType) {
        case 'country':
            return <Country value={value} onChange={onChange} errorMsg={errorMsg} />
        case 'tags':
            return <Tags value={value} onChange={onChange} tags={tags} />
        case 'categories':
            return <ProductCategory value={value} onChange={onChange} />
        case 'productDropdown':
            return <CategoryDropdown value={value} onChange={onChange} />
        case 'size':
            return <SizeDropdown value={value} onChange={onChange} />
        case 'user':
            return <SortDropdown value={value} onChange={onChange} />
        default:
            throw new Error('Invalid dataType prop passed to Dropdown');
    }
}
export default Dropdown;

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
                    id="tags" size="small" variant="outlined" fullWidth label="Tags" helperText="Maximum of 5 tags"
                />
            )}
        />
    )
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
                )} />
            {errorMsg && <Typography variant="body2">{errorMsg}</Typography>}
        </>
    )
}

const ProductCategory = props => {
    const { value, onChange } = props
    const options = useMemo(() => ProductCategories, []);

    return (
        <Autocomplete
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
            )}
        />
    )
}

const CategoryDropdown = props => {
    const { value, onChange } = props
    const options = useMemo(() => ProductCategories, []);

    return (
        <FormControl id="category" fullWidth>
            <InputLabel sx={{ m: -1 }} >Categories</InputLabel>
            <Select
                size="small"
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">
                    Categories
                </MenuItem>
                {options.map((item, i) =>
                    <MenuItem key={i} value={item.label}>
                        {item.label}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

const SortDropdown = props => {
    const { value, onChange } = props
    const options = useMemo(() => Variable, []);

    return (
        <FormControl id="sort" fullWidth>
            <InputLabel sx={{ m: -1 }} >Sort By</InputLabel>
            <Select
                size="small"
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">
                    Categories
                </MenuItem>
                {options.map((item, i) =>
                    <MenuItem key={i} value={item.value}>
                        {item.label}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

const SizeDropdown = props => {
    const { value, onChange } = props
    const options = useMemo(() => Size, []);

    return (
        <Autocomplete
            onChange={(e, val) => onChange({ target: { id: "size", value: val } })}
            id="size"
            getOptionLabel={Size.label}
            value={value}
            options={options.map((option) => option.label)}
            isOptionEqualToValue={(option, val) => option === val}
            renderInput={(params) => <TextInput {...params} id="size" size="small" variant="outlined" fullWidth label="Size" />}
            renderOption={(props, option, { selected }) => (
                <MenuItem key={option} {...props}>
                    {option}{selected && <CheckIcon sx={{ color: 'success.main', pl: 1 }} />}
                </MenuItem>
            )}
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

const Size = [
    { label: 'xs' },
    { label: 'sm' },
    { label: 'md' },
    { label: 'lg' },
    { label: 'xl' },
    { label: 'xxl' },

]

const Variable = [
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },

]

const Empty = []

Dropdown.propTypes = {
    onChange: PropTypes.func.isRequired,
    tags: PropTypes.bool,
};