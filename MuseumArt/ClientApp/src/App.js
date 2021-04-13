import React, {  } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DetailPreview from './components/DetailPreview';
import ErrorPage from './components/ErrorPage';

import * as Page from './util/Page';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

export default function App() {
      return (
          <BrowserRouter basename={baseUrl}>
              <Switch>
                  <Route exact path="/">
                      <Layout />
                  </Route>
                  <Route exact path={Page.HOME}>
                      <Layout />
                  </Route>
                  <Route exact path={Page.ITEM + "/:id"}>
                      <Layout>
                          <DetailPreview />
                      </Layout>
                  </Route>
                  <Route path="*">
                      <ErrorPage code="404" description="Not Found" />
                  </Route>
              </Switch>
          </BrowserRouter>
    );
}
