import React from 'react';
import { Story } from '@storybook/react';
import { MemoryRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { useNaviGate, NaviGateProvider, NaviGateProviderProps } from './useNaviGate';

const Component = () => {
  return (
    <>
      <p>Click the link below to show the blocking dialog.</p>
      <Link to="/awesome">Try me!</Link>
    </>
  );
};

const Template: Story<NaviGateProviderProps> = (props) => (
  <NaviGateProvider {...props}>
    <Router initialEntries={['/']}>
      <Switch>
        <Route path="/">
          <Component />
        </Route>
        <Route path="/awesome">
          <img src="https://media.giphy.com/media/fg9c6gu2NwyWs/giphy.gif" alt="That was awesome!" />
        </Route>
      </Switch>
    </Router>
  </NaviGateProvider>
);

export const Playground: Story<NaviGateProviderProps> = Template.bind({});

export default {
  title: 'Modal/Navigation Prompt',
  component: Playground,
};
