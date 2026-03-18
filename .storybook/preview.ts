import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@/design-system/theme/createTheme';

/**
 * Decorator: Wraps every story with MUI ThemeProvider so components
 * receive the theme (colors, spacing, etc. from tokens).
 */
const withTheme = (Story: React.ComponentType, context: { globals: { theme?: string } }) => {
  const mode = (context.globals.theme as 'light' | 'dark') || 'light';
  const theme = createTheme(mode);

  return React.createElement(
    ThemeProvider,
    { theme },
    React.createElement(CssBaseline),
    React.createElement(Story)
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
