import React, { ReactElement, useState } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { NaviGateProvider } from '../NaviGateProvider';
import { FormExampleComponent } from './form.example';
import { ViewExampleComponent } from './view.example';

export type AppState = {
  [key: string]: string | boolean;
  firstName: string;
  lastName: string;
};

const ExampleApp = (): ReactElement => {
  const [state, setState] = useState<AppState>({
    firstName: '',
    lastName: '',
  });

  const { firstName, lastName } = state;
  const userInfoUpdated = !!(firstName && lastName);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <NaviGateProvider blockingCondition={!userInfoUpdated}>
            <FormExampleComponent state={state} updateState={setState} />
          </NaviGateProvider>
        </Route>
        {userInfoUpdated ? (
          <Route exact path="/feedback">
            <ViewExampleComponent state={state} />
          </Route>
        ) : (
          <Redirect from="/feedback" to="/" />
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default ExampleApp;
