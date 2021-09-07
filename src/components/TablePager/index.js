import React from 'react';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import * as PropTypes from 'prop-types';


export const TablePager = props => {
    const hasMore = props.total > props.count;

    return (
        <>
            {props.count > 0 &&
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={props.colSpan} align="center" sx={{ borderBottom: 'none' }}>
                            {props.count} of {props.total || props.count}
                        </TableCell>
                    </TableRow>
                    {hasMore &&
                        <TableRow>
                            <TableCell colSpan={props.colSpan} align="center">
                                <Button variant="contained"  onClick={props.onPage}>Load More</Button>
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