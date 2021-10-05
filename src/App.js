import React, { lazy, Suspense } from 'react';

import { withAuthenticationRequired } from "@auth0/auth0-react";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout } from './components/Layout';
import { WaitSkeleton } from './components/WaitSkeleton';
import { custom } from './theme';

const Profile = lazy(() => import('./views/Customers/Profile'));
// const Create = lazy(() => import('./views/Customers/Profile/Create'));
const CustomerList = lazy(() => import('./views/Customers/CustomerList'));
const User = lazy(() => import('./views/User'));

const Listing = lazy(() => import('./views/Products/Listing'));
const ProductPage = lazy(() => import('./views/Products/ProductPage'));
const CreateProduct = lazy(() => import('./views/Products/Listing/CreateProduct'));

let theme = createTheme(custom);
theme = responsiveFontSizes(theme)

const App = withAuthenticationRequired(() => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Suspense fallback={<WaitSkeleton visible={true} />}>
            <Switch>
              <Route exact path="/products/:id" component={Listing} />
              <Route exact path="/add-product" component={CreateProduct} />
              <Route exact path="/products" component={ProductPage} />
              <Route exact path="/customers/:id" component={Profile} />
              {/* <Route exact path="/add-customer" component={Create} /> */}
              <Route exact path="/customers" component={CustomerList} />
              <Route exact path="/profile" component={User} />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
})

export default App;