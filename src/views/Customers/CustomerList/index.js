import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/system/Box';

import ActionLink from '../../../components/ActionLink';
import { TablePager } from '../../../components/TablePager';
import { config, getReqInit } from '../../../config';

const reqInit = getReqInit
const peopleUrl = config.goService.peopleApi

const CustomerTable = () => {
    const [people, setPeople] = React.useState([]);
    React.useEffect(() => {
        const fetchPeople = async () => {
            const resp = await fetch(peopleUrl, reqInit);
            if (resp.ok) {
                const json = await resp.json();
                setPeople(json);
            }
        };
        fetchPeople();
    }, []);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - people.count) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                            <TableCell />
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : people
                        ).map((item) => (
                            <TableRow key={item.id} hover sx={{ cursor: 'pointer' }}>
                                <TableCell scope="row" align="right">
                                    <IconButton size="small" component={ActionLink} to={`/customers/${item.id}`}>
                                        <AccountCircleIcon color="primary" fontSize="small" />
                                    </IconButton>
                                </TableCell>
                                <TableCell scope="row" align="left">{item.firstName} {item.lastName} </TableCell>
                                <TableCell align="left">{item.email}</TableCell>
                                <TableCell align="left">{item.phone}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow sx={{ height: "53rem" * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={people.length}
                                rowsPerPage={rowsPerPage}
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
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}
export default CustomerTable;
