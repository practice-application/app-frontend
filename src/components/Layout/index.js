import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import { Footer } from './Footer';
import Header from './Header';

const CustomBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    marginTop: theme.spacing(1),
    minHeight: `calc(90vh - ${theme.spacing(8)}px)`
}));

export const Layout = props => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
            <Header />
            <CustomBox data-cy="main-layout">
                <Container maxWidth="lg">
                    {props.children}
                </Container>
            </CustomBox>
            <Footer />
        </Box>
    )
};
