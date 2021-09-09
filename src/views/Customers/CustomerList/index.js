import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/system/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ActionLink from '../../../components/ActionLink';
import EmptyMessage from '../../../components/EmptyMessage';
import { TablePager } from '../../../components/TablePager';
import { Outline } from '../../../components/WaitSkeleton';
import { config, getReqInit } from '../../../config'

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
                        {people.map((item) => (
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
                        {people.length === 0 &&
                            <TableRow sx={{ minHeight: 53 * 2 }}>
                                <TableCell colSpan="5" align="center">
                                    {people.pending && <Outline variant='list' visible={people.pending} />}
                                    {!people.pending &&
                                        <EmptyMessage />
                                    }
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    <TablePager count={people.length} total={people.count} colSpan={4} />
                </Table>
            </TableContainer>
        </>
    );
}
export default CustomerTable;