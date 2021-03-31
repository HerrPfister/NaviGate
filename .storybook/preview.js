import React from 'react';
import { withDesign } from 'storybook-addon-designs';

export const decorators = [(Story) => <Story />, withDesign];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { hideNoControlsWarning: true },
};
