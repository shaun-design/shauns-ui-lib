/**
 * Button stories - CSF3 format.
 *
 * CSF3 (Component Story Format 3): The standard way to write Storybook stories.
 * Autodocs: Automatically generates docs from component props and JSDoc.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default primary contained button */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
  },
};

/** Light theme - shown when Theme toolbar is set to Light */
export const Light: Story = {
  args: {
    children: 'Primary',
    variant: 'contained',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the Theme toolbar (top) to switch to Light mode.',
      },
    },
  },
};

/** Dark theme - shown when Theme toolbar is set to Dark */
export const Dark: Story = {
  args: {
    children: 'Primary',
    variant: 'contained',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the Theme toolbar (top) to switch to Dark mode.',
      },
    },
  },
};

/** Outlined variant */
export const Outlined: Story = {
  args: {
    children: 'Outlined',
    variant: 'outlined',
  },
};

/** Text variant */
export const Text: Story = {
  args: {
    children: 'Text',
    variant: 'text',
  },
};

/** Secondary color */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'contained',
    color: 'secondary',
  },
};
