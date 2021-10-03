import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
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

export const Pager = ({ count, total, colSpan, onPage }) => {
    const hasMore = total > count;

    return (
        <>
            {count > 0 &&
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1 }}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <Typography>{count} of {total || count}</Typography>
                        {hasMore &&
                            <Button variant="contained" onClick={onPage}>Load More</Button>
                        }
                    </Stack>
                </Box>
            }
        </>
    );
}

TablePager.propTypes = {
    count: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    colSpan: PropTypes.number.isRequired,
    onPage: PropTypes.func,
};
