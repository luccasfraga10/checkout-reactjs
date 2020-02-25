import { BrowserRouter, Route, Switch } from 'react-router-dom';

import React from 'react';
import Checkout from './pages/Checkout';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Checkout} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
