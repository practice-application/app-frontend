import React, { lazy, Suspense } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout } from './components/Layout';
import { WaitSkeleton } from './components/WaitSkeleton';
import { custom } from './theme';

const Profile = lazy(() => import('./views/Profile'));


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
              <Route exact path="/" component={Profile} />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

