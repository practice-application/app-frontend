import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
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
import IconButton from '@mui/material/IconButton';
import ActionLink from '../../../components/ActionLink';
import { TablePager } from '../../../components/TablePager';
import { useApi } from '../context';
import { CustomerProvider } from '../context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import { Person } from '@mui/icons-material';
const pageSize = 10;

const CustomerListExt = () => {
    return (
        <CustomerProvider>
            <CustomerList />
        </CustomerProvider>
    );
}

const CustomerList = () => {
    const [view, setView] = useState('true');
    // const [state, actions] = useApi();
    const [{ people }, { deletePerson, fetchPeople }] = useApi();
    const [page, setPage] = useState({ offset: 0, limit: pageSize });
    // const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchPeople(page);
    }, [fetchPeople, page]);

    const handleDelete = (id) => {
        deletePerson(id);
    };

    const handlePage = () => {

        setPage(prev => ({ ...prev, offset: prev.offset + pageSize }))
    };
    const change = () => {
        setView(false);
    };
    const changeBack = () => {
        setView(true);
    };

    return (
        <>
            <Grid direction='row' sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Box sx={{ display: 'flex', my: 1, padding: 0.5 }}>
                
                {/* <Button onClick={view === true ? change : changeBack}>{view === true ? "Cancel" : "Edit"}</Button> */}
                <Button
                startIcon={view === true ? <CloseIcon fontSize="small" /> : <CreateIcon fontSize="small" />}
                onClick={view === true ? change : changeBack}> {view === true ? "Cancel" : "Edit"}</Button>
                
            </Box>
            <Box sx={{ display: 'flex', my: 1, padding: 0.5 }}>
                <Button variant='contained' component={ActionLink} to="/add">Add User</Button>
            </Box>
            </Grid>
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
                        {people.data.map((item) =>
                            <TableRow key={item.id} hover sx={{ cursor: 'pointer' }}>
                                <TableCell scope="row" align="left">
                                    <Button startIcon={<AccountCircleIcon color="primary" fontSize="small" />} component={ActionLink} to={`/customers/${item.id}`}>
                                        {item.firstName} {item.lastName}
                                    </Button>
                                </TableCell>
                                <TableCell align="left">{item.email}</TableCell>
                                <TableCell align="left">{`${formatDistanceToNow(parseISO(item.date))} ago`}</TableCell>                             
                                <TableCell align="left">{view === true ? <IconButton onClick={() => handleDelete(item.id)}>
                                    <DeleteForeverIcon />
                                    </IconButton> : ''}
                                    </TableCell>
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
