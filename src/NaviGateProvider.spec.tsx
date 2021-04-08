import React from 'react';
import { Link, MemoryRouter, Route, Switch } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Chance from 'chance';

import { NaviGateProvider } from './NaviGateProvider';

const chance = new Chance();

describe('NaviGateProvider', () => {
  it('should render the children', () => {
    const expectedHeader = chance.word();

    render(
      <MemoryRouter>
        <NaviGateProvider>
          <h1>{expectedHeader}</h1>
        </NaviGateProvider>
      </MemoryRouter>,
    );

    const header = screen.getByRole('heading', { name: expectedHeader });

    expect(header).toBeInTheDocument();
  });

  it('should append a prompt to the DOM when user navigates away', () => {
    const givenRoute = `/${chance.word()}`;
    const givenHeader = chance.word();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Route path="/">
          <NaviGateProvider>
            <h1>{givenHeader}</h1>
            <Link to={givenRoute}>go</Link>
          </NaviGateProvider>
        </Route>
      </MemoryRouter>,
    );

    const header = screen.getByRole('heading', { name: givenHeader });
    expect(header).toBeInTheDocument();

    let prompt = screen.queryByRole('presentation');
    expect(prompt).not.toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'go' });
    userEvent.click(link);

    prompt = screen.getByRole('presentation');
    expect(prompt).toBeInTheDocument();
  });

  it('should continue navigation to new page when user clicks confirm in prompt', () => {
    const givenRoute = `/${chance.word()}`;
    const givenHeader = chance.word();
    const expectedHeader = chance.word();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Switch>
          <Route exact path="/">
            <NaviGateProvider>
              <h1>{givenHeader}</h1>
              <Link to={givenRoute}>go</Link>
            </NaviGateProvider>
          </Route>
          <Route exact path={givenRoute}>
            <h1>{expectedHeader}</h1>
          </Route>
        </Switch>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'go' });
    userEvent.click(link);

    const confirmBtn = screen.getByRole('button', { name: 'confirm-action' });
    userEvent.click(confirmBtn);

    const newPageHeader = screen.getByRole('heading', { name: expectedHeader });
    expect(newPageHeader).toBeInTheDocument();
  });

  it('should cancel navigation to new page when user clicks cancel in prompt', () => {
    const givenRoute = `/${chance.word()}`;
    const givenHeader = chance.word();
    const expectedHeader = chance.word();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Switch>
          <Route exact path="/">
            <NaviGateProvider>
              <h1>{givenHeader}</h1>
              <Link to={givenRoute}>go</Link>
            </NaviGateProvider>
          </Route>
          <Route exact path={givenRoute}>
            <h1>{expectedHeader}</h1>
          </Route>
        </Switch>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'go' });
    userEvent.click(link);

    const cancelBtn = screen.getByRole('button', { name: 'cancel-action' });
    userEvent.click(cancelBtn);

    const newPageHeader = screen.queryByRole('heading', { name: expectedHeader });
    expect(newPageHeader).not.toBeInTheDocument();
  });

  it('should pass event to passed in callback when user clicks confirm in prompt', () => {
    const givenRoute = `/${chance.word()}`;
    const givenHeader = chance.word();
    const mockedConfirm = jest.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Switch>
          <Route exact path="/">
            <NaviGateProvider onConfirm={mockedConfirm}>
              <h1>{givenHeader}</h1>
              <Link to={givenRoute}>go</Link>
            </NaviGateProvider>
          </Route>
        </Switch>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'go' });
    userEvent.click(link);

    const confirmBtn = screen.getByRole('button', { name: 'confirm-action' });
    userEvent.click(confirmBtn);

    expect(mockedConfirm).toHaveBeenCalled();
  });

  it('should pass event to passed in callback when user clicks cancel in prompt', () => {
    const givenRoute = `/${chance.word()}`;
    const givenHeader = chance.word();
    const mockedCancel = jest.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Switch>
          <Route exact path="/">
            <NaviGateProvider onCancel={mockedCancel}>
              <h1>{givenHeader}</h1>
              <Link to={givenRoute}>go</Link>
            </NaviGateProvider>
          </Route>
        </Switch>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'go' });
    userEvent.click(link);

    const cancelBtn = screen.getByRole('button', { name: 'cancel-action' });
    userEvent.click(cancelBtn);

    expect(mockedCancel).toHaveBeenCalled();
  });

  it('should not show prompt if additional blocking condition is false', () => {
    const givenRoute = `/${chance.word()}`;
    const givenHeader = chance.word();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Switch>
          <Route exact path="/">
            <NaviGateProvider blockingCondition={false}>
              <h1>{givenHeader}</h1>
              <Link to={givenRoute}>go</Link>
            </NaviGateProvider>
          </Route>
        </Switch>
      </MemoryRouter>,
    );

    let prompt = screen.queryByRole('presentation');
    expect(prompt).not.toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'go' });
    userEvent.click(link);

    prompt = screen.queryByRole('presentation');
    expect(prompt).not.toBeInTheDocument();
  });
});
