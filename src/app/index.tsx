/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { AddAccountPage } from './pages/AddAccountPage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Muc"
        defaultTitle="Muc"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A Muc Muc dang iu" />
      </Helmet>
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + '/'}
          component={() => <Redirect to="/account" />}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/account'}
          component={HomePage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/add-account'}
          component={AddAccountPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
