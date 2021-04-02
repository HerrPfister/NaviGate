import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Chance from 'chance';

import { NaviGateDialog } from './NaviGateDialog';

const chance = new Chance();

describe('NaviGateDialog', () => {
  it('should render', () => {
    render(<NaviGateDialog open={true} onCancel={jest.fn()} onConfirm={jest.fn()} />);

    const dialog = screen.getByRole('presentation');

    expect(dialog).toBeInTheDocument();
  });

  it('should not render if open is false', () => {
    render(<NaviGateDialog open={false} onCancel={jest.fn()} onConfirm={jest.fn()} />);

    const dialog = screen.queryByRole('presentation');

    expect(dialog).not.toBeInTheDocument();
  });

  it('should show custom content if provided', () => {
    const expectedActions = chance.word();
    const expectedContent = chance.word();
    const expectedTitle = chance.word();

    render(
      <NaviGateDialog
        open={true}
        NaviGateDialogContent={expectedContent}
        NaviGateDialogTitle={expectedTitle}
        NaviGateDialogActions={expectedActions}
        onCancel={jest.fn()}
        onConfirm={jest.fn()}
      />,
    );

    const dialog = screen.getByRole('presentation');
    const dialogActions = within(dialog).getByTestId('navi-gate-dialog-actions');
    const dialogContent = within(dialog).getByTestId('navi-gate-dialog-content');
    const dialogTitle = within(dialog).getByRole('heading');

    expect(dialog).toBeInTheDocument();
    expect(dialogActions).toHaveTextContent(expectedActions);
    expect(dialogContent).toHaveTextContent(expectedContent);
    expect(dialogTitle).toHaveTextContent(expectedTitle);
  });

  it('should call confirm function when confirm is clicked', () => {
    const mockedConfirm = jest.fn();

    render(<NaviGateDialog open={true} onCancel={jest.fn()} onConfirm={mockedConfirm} />);

    const dialog = screen.getByRole('presentation');
    const confirmBtn = within(dialog).getByRole('button', { name: 'confirm-action' });

    expect(dialog).toBeInTheDocument();
    expect(confirmBtn).toBeInTheDocument();

    userEvent.click(confirmBtn);

    expect(mockedConfirm).toHaveBeenCalled();
  });

  it('should call cancel function when cancel is clicked', () => {
    const mockedCancel = jest.fn();

    render(<NaviGateDialog open={true} onCancel={mockedCancel} onConfirm={jest.fn()} />);

    const dialog = screen.getByRole('presentation');
    const cancelBtn = within(dialog).getByRole('button', { name: 'cancel-action' });

    expect(dialog).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();

    userEvent.click(cancelBtn);

    expect(mockedCancel).toHaveBeenCalled();
  });
});
