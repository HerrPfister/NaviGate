import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { NaviGateDialog, NaviGateDialogProps } from './NaviGateDialog';

const Template: Story<NaviGateDialogProps> = ({ open, ...props }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleCancel = () => setIsOpen(false);

  const handleConfirm = () => setIsOpen(false);

  return (
    <div style={{ minHeight: 1000 }}>
      <NaviGateDialog {...props} onCancel={handleCancel} onConfirm={handleConfirm} open={isOpen} />
    </div>
  );
}

export const Playground: Story<NaviGateDialogProps> = Template.bind({});

Playground.args = {
  open: true,
  DialogActionsProps: {
    disableSpacing: false,
  },
  DialogContentProps: {
    dividers: false,
  },
  DialogTitleProps: {
    disableTypography: false,
  },
  PaperProps: {
    elevation: 1,
    square: false,
    variant: 'elevation',
  },
};

export default {
  title: 'Components/NaviGateDialog',
  component: Playground,
  parameters: {
    docs: {
      inlineStories: false,
    },
    options: {
      showPanel: true,
    },
  }
};

export const NaviGateDisableDialogActionSpacing: Story<NaviGateDialogProps> = () =>
  <NaviGateDialog
    DialogActionsProps={{ disableSpacing: true }}
    onCancel={() => { }}
    onConfirm={() => { }}
    open={true}
  />

NaviGateDisableDialogActionSpacing.storyName = "Disable Actions Spacing";

export const NaviGateDisableDialogTitleTypography: Story<NaviGateDialogProps> = () =>
  <NaviGateDialog
    DialogTitleProps={{ disableTypography: true }}
    onCancel={() => { }}
    onConfirm={() => { }}
    open={true}
  />;

NaviGateDisableDialogTitleTypography.storyName = "Disable Title Typography";

export const NaviGateEnableDialogContentDividers: Story<NaviGateDialogProps> = () =>
  <NaviGateDialog
    DialogContentProps={{ dividers: true }}
    onCancel={() => { }}
    onConfirm={() => { }}
    open={true}
  />

NaviGateEnableDialogContentDividers.storyName = "Enable Content Dividers";

export const NaviGateDialogPaperVariantOutlined: Story<NaviGateDialogProps> = () =>
  <NaviGateDialog
    PaperProps={{ variant: 'outlined' }}
    onCancel={() => { }}
    onConfirm={() => { }}
    open={true}
  />;

NaviGateDialogPaperVariantOutlined.storyName = "Outlined Paper Content";

export const NaviGateDialogPaperNoElevation: Story<NaviGateDialogProps> = () =>
  <NaviGateDialog
    PaperProps={{ elevation: 0 }}
    onCancel={() => { }}
    onConfirm={() => { }}
    open={true}
  />;

NaviGateDialogPaperNoElevation.storyName = "Paper Content No Elevation";

export const NaviGateDialogPaperSquare: Story<NaviGateDialogProps> = () =>
  <NaviGateDialog
    PaperProps={{ square: true }}
    onCancel={() => { }}
    onConfirm={() => { }}
    open={true}
  />;

NaviGateDialogPaperSquare.storyName = "Paper Content Square";
