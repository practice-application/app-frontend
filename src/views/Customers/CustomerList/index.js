import React, { useState, useEffect } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { parseISO, formatDistanceToNow } from "date-fns";

import ActionLink from '../../../components/ActionLink';
import { TablePager } from '../../../components/TablePager';
import { useApi } from '../context';
import { CustomerProvider } from '../context';

const pageSize = 10;

export const CustomerListExt = () => {
    return (
        <CustomerProvider>
            <CustomerList />
        </CustomerProvider>
    );
}

const CustomerList = () => {
    const [view, setView] = useState('true');
    const { user } = useAuth0();
    const { sub } = user;
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

    const filtered = people.data.filter(item => item.auth0id === sub).map((item, i) =>
        item.auth0id.includes(sub)
    );

    return (
        <>
            {people.data ?
                <>
                    <Grid container direction='row' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ display: 'flex', my: 1, padding: 0.5 }}>
                            <Button
                                variant="outlined"
                                endIcon={view === true ? <CloseIcon fontSize="small" /> : <CreateIcon fontSize="small" />}
                                onClick={view === true ? change : changeBack}> {view === true ? "Close" : "Edit"}</Button>

                        </Box>
                    </Grid>

                    {filtered.length > 0 ?
                        filtered.map((i) =>
                            <TableContainer key={i} sx={{
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

                                                <TableCell align="left"> {view === true ?
                                                    <IconButton size="small" onClick={() => handleDelete(item.id)}>
                                                        <DeleteForeverIcon fontSize="small" />
                                                    </IconButton> : ''}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TablePager count={people.data.length} total={people.matches}
                                        colSpan={3} onPage={() => handlePage()}
                                    />

                                </Table>
                            </TableContainer >)
                        :
                        <>

                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Typography sx={{ pt: 2 }} variant="h2">You currently haven't set up your profile </Typography>
                                <Typography>    in order to view other customers, please create your profile</Typography>
                                <Button variant='contained' sx={{ mr: 0.5 }} component={ActionLink} to="/onboarding">Create profile</Button>
                            </Stack>
                        </>
                    }

                </>
                :
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <ErrorOutlineIcon />
                    <Typography sx={{ pt: 2 }}>No customer data to display at the moment</Typography>
                    <Button variant='outlined' sx={{ ml: 0.5 }} component={ActionLink} to="/">Return</Button>
                </Stack>
            }
        </>
    );
}
export default CustomerListExt;
