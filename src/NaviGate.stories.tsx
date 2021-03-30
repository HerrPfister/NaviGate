import React from 'react';
import { Story } from '@storybook/react';
import { MemoryRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { NaviGateProvider, NaviGateProviderProps } from './useNaviGate';

const Template: Story<NaviGateProviderProps> = (props) => (
  <Router initialEntries={['/']}>
    <NaviGateProvider {...props}>
      <Switch>
        <Route exact path="/">
          <p>Click the link below to show the blocking dialog.</p>
          <Link to="/awesome">Try me!</Link>
        </Route>
        <Route exact path="/awesome">
          <img src="https://media.giphy.com/media/fg9c6gu2NwyWs/giphy.gif" alt="That was awesome!" />
          <Link to="/">Go back!</Link>
        </Route>
      </Switch>
    </NaviGateProvider>
  </Router>
);

export const Playground: Story<NaviGateProviderProps> = Template.bind({});

export default {
  title: 'NaviGate',
  component: Playground,
};
