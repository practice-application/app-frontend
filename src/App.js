import React, { lazy, Suspense } from 'react';

import { withAuthenticationRequired } from "@auth0/auth0-react";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout } from './components/Layout';
import { WaitSkeleton } from './components/WaitSkeleton';
import { custom } from './theme';

const Profile = lazy(() => import('./views/Customers/Profile'));
const CreatePerson = lazy(() => import('./views/Customers/Profile/Create'));
const CustomerList = lazy(() => import('./views/Customers/CustomerList'));
const UserProfile = lazy(() => import('./views/User'));

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
              <Route exact path="/customers/:id" component={Profile} />
              <Route exact path="/add" component={CreatePerson} />
              <Route exact path="/customers" component={CustomerList} />
              <Route exact path="/profile" component={UserProfile} />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
})

export default App;