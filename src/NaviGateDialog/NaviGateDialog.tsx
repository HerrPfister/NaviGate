import React, { ReactNode, MouseEventHandler, useMemo } from 'react';
import {
  PaperProps,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  DialogTitleProps,
  DialogContentProps,
  DialogActionsProps,
} from '@material-ui/core';

export type NaviGateDialogComponentProps = {
  DialogTitleProps?: DialogTitleProps;
  DialogContentProps?: DialogContentProps;
  DialogActionsProps?: DialogActionsProps;
  NaviGateDialogActions?: ReactNode;
  NaviGateDialogTitle?: ReactNode;
  NaviGateDialogContent?: ReactNode;
  PaperProps?: PaperProps;
};

export type NaviGateDialogProps = {
  id?: string;
  onCancel: MouseEventHandler;
  onConfirm: MouseEventHandler;
  open: boolean;
} & NaviGateDialogComponentProps;

export const WARNING_MESSAGE = 'Are you sure you want to leave this screen? You will lose unsaved changes.';

export const NaviGateDialog = ({
  id,
  DialogTitleProps,
  DialogContentProps,
  DialogActionsProps,
  onCancel,
  onConfirm,
  open,
  NaviGateDialogActions,
  NaviGateDialogContent,
  NaviGateDialogTitle,
  PaperProps,
  ...props
}: NaviGateDialogProps): JSX.Element => {
  const dialogId = id || 'navi-gate-dialog';
  const dialogContentId = `${dialogId}-content`;
  const dialogTitleId = `${dialogId}-title`;
  const dialogActionsId = `${dialogId}-actions`;

  const DialogPaper = (props: PaperProps) => <Paper {...props} {...PaperProps} />;

  const Content = useMemo(() => NaviGateDialogContent || <DialogContentText>{WARNING_MESSAGE}</DialogContentText>, [
    NaviGateDialogContent,
  ]);

  const Title = useMemo(() => NaviGateDialogTitle || 'ARE YOU SURE?', [NaviGateDialogTitle]);

  const Actions = useMemo(
    () =>
      NaviGateDialogActions || (
        <>
          <Button variant="text" onClick={onCancel} color="primary" aria-label="cancel-action">
            Cancel
          </Button>
          <Button variant="text" onClick={onConfirm} color="primary" autoFocus aria-label="confirm-action">
            Leave
          </Button>
        </>
      ),
    [NaviGateDialogActions],
  );

  return (
    <Dialog
      {...props}
      aria-labelledby={dialogTitleId}
      aria-describedby={dialogContentId}
      open={open}
      onClose={onCancel}
      PaperComponent={DialogPaper}
    >
      <DialogTitle {...DialogTitleProps} id={dialogTitleId}>
        {Title}
      </DialogTitle>
      <DialogContent {...DialogContentProps} id={dialogContentId} data-testid={dialogContentId}>
        {Content}
      </DialogContent>
      <DialogActions {...DialogActionsProps} id={dialogActionsId} data-testid={dialogActionsId}>
        {Actions}
      </DialogActions>
    </Dialog>
  );
};
