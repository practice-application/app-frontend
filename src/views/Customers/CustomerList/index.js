import React, { useState, useEffect } from 'react';

import { useAuth0 } from "@auth0/auth0-react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ActionLink from '../../../components/ActionLink';
import { DisplayCard } from '../../../components/DisplayCard';
import { SearchBar } from '../../../components/SearchBar'
import { Pager } from '../../../components/TablePager';
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
    const { user } = useAuth0();
    const { sub } = user;
    const [{ people }, { deletePerson, fetchPeople }] = useApi();
    const [page, setPage] = useState({ offset: 0, limit: pageSize });
    const [query, setQuery] = useState('');

    useEffect(() => {
        fetchPeople(page);
    }, [fetchPeople, page]);

    const handleDelete = (id) => {
        deletePerson(id);
    };

    const handlePage = () => {
        setPage(prev => ({ ...prev, offset: prev.offset + pageSize }))
    };

    const filtered = people.data.filter(item => item.auth0id === sub).map((item, i) =>
        item.auth0id.includes(sub)
    );

    return (
        <>
            {people.data ?
                <>
                    {filtered.length > 0 ?
                        filtered.map((i) =>
                            <Container maxWidth="md" key={i}>
                                <Typography sx={{ pt: 2 }} variant="h2">Other Users </Typography>
                                <SearchBar value={query} onChange={setQuery} />
                                {people.data.filter(item => query ? ((item.firstName) + (item.lastName)).toLowerCase().includes(query.toLowerCase())
                                    : item).sort((a, b) => a.lastName > b.lastName ? -1 : 1).map((item, i) =>
                                        <DisplayCard
                                            title={`${item.firstName} ${item.lastName}`}
                                            subtitle={item.email}
                                            key={i}
                                            to={`/customers/${item.id}`}
                                            image={item.avatar}
                                            dataType="small"
                                            onDelete={() => handleDelete(item.id)}
                                            variable="customer"
                                        />
                                    )}

                                <Pager count={people.data.length} total={people.matches}
                                    colSpan={3} onPage={() => handlePage()}
                                />
                            </Container>

                        )
                        :
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography sx={{ pt: 2 }} variant="h2">You currently haven't set up your profile </Typography>
                            <Typography>In order to view other customers, please create your profile</Typography>
                            <Button variant='contained' sx={{ mr: 0.5 }} component={ActionLink} to="/onboarding">Create profile</Button>
                        </Stack>
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