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
