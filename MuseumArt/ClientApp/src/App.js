import React, {  } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';

import * as Page from './util/Page';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

export default function App() {
      return (
          <BrowserRouter basename={baseUrl}>
              <Switch>
                  <Route exact path="/">
                      <Layout>
                          <Home />
                      </Layout>
                  </Route>
                  <Route exact path={Page.HOME}>
                      <Layout>
                          <Home />
                      </Layout>
                  </Route>
                  <Route path="*">
                      <ErrorPage code="404" description="Not Found" />
                  </Route>
              </Switch>
          </BrowserRouter>
    );
}
