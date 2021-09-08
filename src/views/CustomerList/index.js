import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { config } from '../../config'

const reqInit = {
    method: "GET",
    mode: 'cors',
    headers: {
        Accept: 'application/ json',
        'Content-Type': 'application/json'
    },
};

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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {people.map((item) => (
                        <TableRow key={item.firstName}>
                            <TableCell component="th" scope="row">  {item.firstName}</TableCell>
                            <TableCell align="right">{item.lastName}</TableCell>
                            <TableCell align="right">{item.age}</TableCell>
                            <TableCell align="right">{item.email}</TableCell>
                            <TableCell align="right">{item.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default CustomerTable;