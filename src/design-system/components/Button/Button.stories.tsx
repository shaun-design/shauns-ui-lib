/**
 * Button stories - CSF3 format.
 *
 * Covers all variants, sizes, colors, and states from your Figma API.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack from '@mui/material/Stack';
import { Button, type ButtonComponentProps } from './Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const iconStyle = { width: 20, height: 20 };

/** Wrapper so showStartIcon/showEndIcon appear as boolean toggles in Controls (matches Figma) */
function ButtonWithIconToggles(
  props: ButtonComponentProps & { showStartIcon?: boolean; showEndIcon?: boolean }
) {
  const { showStartIcon = false, showEndIcon = false, startIcon, endIcon, ...rest } = props;
  return (
    <Button
      {...rest}
      startIcon={showStartIcon ? (startIcon ?? <ChevronLeftIcon style={iconStyle} />) : undefined}
      endIcon={showEndIcon ? (endIcon ?? <ChevronRightIcon style={iconStyle} />) : undefined}
    />
  );
}

const meta = {
  title: 'Design System/Button',
  component: ButtonWithIconToggles,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    showStartIcon: false,
    showEndIcon: false,
    disabled: false,
  },
  argTypes: {
    showStartIcon: {
      control: 'boolean',
      description: 'Show icon before label (Figma: Icon Start)',
    },
    showEndIcon: {
      control: 'boolean',
      description: 'Show icon after label (Figma: End Icon)',
    },
    startIcon: {
      control: false,
      description: 'Custom start icon (use showStartIcon toggle in Controls)',
    },
    endIcon: {
      control: false,
      description: 'Custom end icon (use showEndIcon toggle in Controls)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'],
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof ButtonWithIconToggles>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default contained primary button */
export const Default: Story = {
  args: {
    children: 'Label',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
};

/** Small size */
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'small',
  },
};

/** Medium size */
export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'medium',
  },
};

/** Large size */
export const Large: Story = {
  args: {
    children: 'Large',
    size: 'large',
  },
};

/** Primary color */
export const Primary: Story = {
  args: {
    children: 'Primary',
    color: 'primary',
  },
};

/** Secondary color */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    color: 'secondary',
  },
};

/** Error color */
export const Error: Story = {
  args: {
    children: 'Error',
    color: 'error',
  },
};

/** Success color */
export const Success: Story = {
  args: {
    children: 'Success',
    color: 'success',
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

/** Disabled state */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

/** With start icon (Figma: Icon Start) */
export const WithStartIcon: Story = {
  args: {
    children: 'Back',
    showStartIcon: true,
  },
};

/** With end icon (Figma: End Icon) */
export const WithEndIcon: Story = {
  args: {
    children: 'Next',
    showEndIcon: true,
  },
};

/** Both icons */
export const WithBothIcons: Story = {
  args: {
    children: 'Navigate',
    showStartIcon: true,
    showEndIcon: true,
  },
};

/** All variants in a row */
export const AllVariants: Story = {
  args: { children: '' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Button variant="contained" color="primary">
        Contained
      </Button>
      <Button variant="outlined" color="primary">
        Outlined
      </Button>
      <Button variant="text" color="primary">
        Text
      </Button>
    </Stack>
  ),
};

/** All sizes */
export const AllSizes: Story = {
  args: { children: '' },
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </Stack>
  ),
};

/** All colors */
export const AllColors: Story = {
  args: { children: '' },
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="error">Error</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
    </Stack>
  ),
};
