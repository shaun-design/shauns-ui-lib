/**
 * Chip stories - CSF3 format.
 *
 * Covers all variants, sizes, colors, and states from your Figma API.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack from '@mui/material/Stack';
import { Chip, type ChipComponentProps } from './Chip';
import { Avatar } from '../Avatar';

const defaultAvatar = <Avatar content="text" initials="M" size="24px" />;

/** Wrapper so showAvatar appears in docs Controls (autodocs infers from component props) */
function ChipWithAvatarToggle(props: ChipComponentProps & { showAvatar?: boolean }) {
  const { showAvatar = false, thumbnail, ...rest } = props;
  const effectiveThumbnail = showAvatar ? (thumbnail ?? defaultAvatar) : undefined;
  return <Chip {...rest} thumbnail={effectiveThumbnail} />;
}

const meta = {
  title: 'Design System/Chip',
  component: ChipWithAvatarToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    showAvatar: false,
    deletable: false,
    disabled: false,
  },
  argTypes: {
    showAvatar: {
      control: 'boolean',
      description: 'Show avatar/thumbnail',
    },
    thumbnail: {
      control: false,
      description: 'Custom avatar or icon (use showAvatar for docs toggle)',
    },
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
      description: 'Show delete icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof ChipWithAvatarToggle>;

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

/** Chip with Avatar (initials) - matches MUI Avatar chip pattern */
export const WithAvatarInitials: Story = {
  args: {
    label: 'Avatar',
    showAvatar: true,
    thumbnail: <Avatar content="text" initials="M" size="24px" />,
  },
};

/** Chip with Avatar (image) - matches MUI Avatar chip pattern */
export const WithAvatarImage: Story = {
  args: {
    label: 'Avatar',
    variant: 'outlined',
    showAvatar: true,
    thumbnail: (
      <Avatar
        content="image"
        src="https://mui.com/static/images/avatar/1.jpg"
        size="24px"
      />
    ),
  },
};

/** Avatar chips in a row - reference: https://mui.com/material-ui/react-chip/ */
export const AvatarChips: Story = {
  args: {
    label: 'Avatar',
    showAvatar: true,
  },
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <ChipWithAvatarToggle
        {...args}
        thumbnail={<Avatar content="text" initials="M" size="24px" />}
        label="Avatar"
      />
      <ChipWithAvatarToggle
        {...args}
        thumbnail={
          <Avatar
            content="image"
            src="https://mui.com/static/images/avatar/1.jpg"
            size="24px"
          />
        }
        label="Avatar"
        variant="outlined"
      />
    </Stack>
  ),
};
