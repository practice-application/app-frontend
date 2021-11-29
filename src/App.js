import React, { Suspense } from 'react';

import { withAuthenticationRequired } from "@auth0/auth0-react";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { WaitSkeleton } from './components/WaitSkeleton';
import { custom } from './theme';
import Profile from './views/Customers/Profile';
import { Create } from './views/Customers/Profile/Create';
import CustomerList from './views/Customers/CustomerList';
import Listing from './views/Products/Listing';
import ProductPage from './views/Products/ProductPage';
import CreateProduct from './views/Products/Listing/CreateProduct';

let theme = createTheme(custom);
theme = responsiveFontSizes(theme)

const App = withAuthenticationRequired(() => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Suspense fallback={<WaitSkeleton visible={true} />}>
            <Routes>
              <Route exact path="/" element={<ProductPage />} />
              <Route exact path="/products/:id" element={<Listing />} />
              <Route exact path="/add-product" element={<CreateProduct />} />
              <Route exact path="/customers/:id" element={<Profile />} />
              <Route exact path="/onboarding" element={<Create />} />
              <Route exact path="/customers" element={<CustomerList />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
})

export default App;