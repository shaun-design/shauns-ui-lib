import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@/design-system/theme/createTheme';

/**
 * Decorator: Wraps every story with MUI ThemeProvider so components
 * receive the theme (colors, spacing, etc. from tokens).
 *
 * The wrapper div applies the theme's background so the Docs canvas
 * shows light/dark correctly when you toggle the Theme toolbar.
 */
const withTheme = (Story: React.ComponentType, context: { globals: { theme?: string } }) => {
  const mode = (context.globals.theme as 'light' | 'dark') || 'light';
  const theme = createTheme(mode);

  const wrapper = React.createElement(
    'div',
    {
      style: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100%',
        padding: 16,
      },
    },
    React.createElement(Story)
  );

  return React.createElement(
    ThemeProvider,
    { theme },
    React.createElement(CssBaseline),
    wrapper
  );
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      description: 'Light or dark mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
