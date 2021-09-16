import React from 'react';

import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import * as PropTypes from 'prop-types';


export const TablePager = ({ count, total, colSpan, onPage }) => {
    const hasMore = total > count;

    return (
        <>
            {count > 0 &&
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={colSpan} align="center" sx={{ borderBottom: 'none' }}>
                            {count} of {total || count}
                        </TableCell>
                    </TableRow>
                    {hasMore &&
                        <TableRow>
                            <TableCell colSpan={colSpan} align="center">
                                <Button variant="contained" onClick={onPage}>Load More</Button>
                            </TableCell>
                        </TableRow>
                    }
                </TableFooter>
            }
        </>
    );
}

TablePager.propTypes = {
    count: PropTypes.number.isRequired,
    total: PropTypes.number, //.isRequired,
    colSpan: PropTypes.number.isRequired,
    onPage: PropTypes.func,
};

// TablePager.defaultProps = {
//     count: 0,
//     total: 0,
// };