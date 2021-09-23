import React, { useState, useEffect } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/system/Box';
import { parseISO, formatDistanceToNow } from "date-fns";

import ActionLink from '../../../components/ActionLink';
import { TablePager } from '../../../components/TablePager';
import { useApi } from '../context';
import { CustomerProvider } from '../context';



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
    const [{ people }, { deletePerson, fetchPeople }] = useApi();
    const [page, setPage] = useState({ offset: 0, limit: pageSize });

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
            <Grid direction='row' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', my: 1, padding: 0.5 }}>
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
                    </TableBody>
                    <TablePager count={people.data.length} total={people.matches}
                        colSpan={3} onPage={() => handlePage()}
                    />
                </Table>
            </TableContainer>
        </>
    );
}
export default CustomerListExt;
