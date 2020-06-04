import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Loading from '../Loading';
const Home = lazy(() => import('../Home'));
const Editor = lazy(() => import('../Editor'));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={Loading}>
        <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/editor">
              <Editor />
            </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}