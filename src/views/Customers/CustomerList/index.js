import React, { useState, useEffect } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/system/Box';
import { parseISO, formatDistanceToNow } from "date-fns";

import ActionLink from '../../../components/ActionLink';
import { TablePager } from '../../../components/TablePager';
import { useApi } from '../context';
import { CustomerProvider } from '../context';

const pageSize = 1;

const CustomerListExt = () => {
    return (
        <CustomerProvider>
            <CustomerList />
        </CustomerProvider>
    );
}

const CustomerList = () => {
    const [{ people }, actions] = useApi();
    const [page, setPage] = useState({ offset: 0, limit: pageSize });
    // const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        actions.fetchPeople(page);
    }, [actions, page]);

    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - people.count) : 0;

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    const handlePage = () => {

        setPage(prev => ({ ...prev, offset: prev.offset + pageSize }))
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
                <Button variant='contained' component={ActionLink} to="/add">Add User</Button>
            </Box>
            <TableContainer sx={{
                '& [class*="MuiTableCell-head"]': {
                    backgroundColor: 'background.paper',
                    color: 'text.secondary',
                },
                '& [class*="MuiTableCell-body"]': {
                    color: 'tableData'
                }
            }} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Created at</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {(rowsPerPage > 0
                            ? people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}

                        {people.data.map((item) =>
                            <TableRow key={item.id} hover sx={{ cursor: 'pointer' }}>
                                <TableCell scope="row" align="left">
                                    <Button startIcon={<AccountCircleIcon color="primary" fontSize="small" />} component={ActionLink} to={`/customers/${item.id}`}>
                                        {item.firstName} {item.lastName}
                                    </Button>
                                </TableCell>
                                <TableCell align="left">{item.email}</TableCell>
                                <TableCell align="left">{`${formatDistanceToNow(parseISO(item.date))} ago`}</TableCell>
                                <TableCell />
                            </TableRow>
                        )}
                        {/* {emptyRows > 0 && (
                            <TableRow sx={{ height: "53rem" * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )} */}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={people.length}
                                rowsPerPage={pageSize}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePager}
                            />
                        </TableRow>
                    </TableFooter> */}
                    <TablePager count={people.data.length} total={people.matches}
                        colSpan={3} onPage={() => handlePage()}
                    />
                </Table>
            </TableContainer>
        </>
    );
}
export default CustomerListExt;
