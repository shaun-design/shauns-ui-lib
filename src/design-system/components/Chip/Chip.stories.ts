/**
 * Chip stories - CSF3 format.
 *
 * Covers all variants, sizes, colors, and states from your Figma API.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta = {
  title: 'Design System/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    deletable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default filled chip */
export const Default: Story = {
  args: {
    label: 'Chip',
    variant: 'filled',
    size: 'large',
  },
};

/** Small size */
export const Small: Story = {
  args: {
    label: 'Small',
    size: 'small',
  },
};

/** Large size (default) */
export const Large: Story = {
  args: {
    label: 'Large',
    size: 'large',
  },
};

/** Primary color */
export const Primary: Story = {
  args: {
    label: 'Primary',
    color: 'primary',
  },
};

/** Secondary color */
export const Secondary: Story = {
  args: {
    label: 'Secondary',
    color: 'secondary',
  },
};

/** Outlined variant */
export const Outlined: Story = {
  args: {
    label: 'Outlined',
    variant: 'outlined',
  },
};

/** Error color */
export const Error: Story = {
  args: {
    label: 'Error',
    color: 'error',
  },
};

/** Success color */
export const Success: Story = {
  args: {
    label: 'Success',
    color: 'success',
  },
};

/** Disabled state */
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

/** Deletable chip */
export const Deletable: Story = {
  args: {
    label: 'Deletable',
    deletable: true,
    onDelete: () => alert('Delete clicked'),
  },
};
