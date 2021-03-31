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
  onCancel: MouseEventHandler;
  onConfirm: MouseEventHandler;
  open: boolean;
} & NaviGateDialogComponentProps;

export const NaviGateDialog = ({
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
  const DialogPaper = (props: PaperProps) => <Paper {...props} {...PaperProps} />;

  const Content = useMemo(
    () =>
      NaviGateDialogContent || (
        <DialogContentText>
          Are you sure you want to leave this screen? You will lose unsaved changes.
        </DialogContentText>
      ),
    [NaviGateDialogContent],
  );

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
    <Dialog {...props} open={open} onClose={onCancel} PaperComponent={DialogPaper}>
      <DialogTitle {...DialogTitleProps}>{Title}</DialogTitle>
      <DialogContent {...DialogContentProps}>{Content}</DialogContent>
      <DialogActions {...DialogActionsProps}>{Actions}</DialogActions>
    </Dialog>
  );
};
