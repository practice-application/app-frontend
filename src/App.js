import React, { lazy, Suspense } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout } from './components/Layout';
import { WaitSkeleton } from './components/WaitSkeleton';
import { custom } from './theme';

const Profile = lazy(() => import('./views/Profile'));
const Create = lazy(() => import('./views/Create'));
const CustomerList = lazy(() => import('./views/CustomerList'));


let theme = createTheme(custom);
theme = responsiveFontSizes(theme)


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Suspense fallback={<WaitSkeleton visible={true} />}>
            <Switch>
              <Route exact path="/customer" component={Profile} />
              <Route exact path="/registration" component={Create} />
              <Route exact path="/customers" component={CustomerList} />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

