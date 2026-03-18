/**
 * Avatar stories - CSF3 format.
 *
 * Covers all content types, sizes, variants, and badge from your Figma API.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserIcon } from '@heroicons/react/24/outline';
import { Avatar } from './Avatar';

const meta = {
  title: 'Design System/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'select',
      options: ['text', 'icon', 'image'],
    },
    size: {
      control: 'select',
      options: ['18px', '24px', '32px', '40px'],
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
    },
    badge: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default: text content, circular, 40px */
export const Default: Story = {
  args: {
    content: 'text',
    initials: 'OP',
    size: '40px',
    variant: 'circular',
  },
};

/** Text content with custom initials */
export const Text: Story = {
  args: {
    content: 'text',
    initials: 'JD',
    size: '40px',
    variant: 'circular',
  },
};

/** Icon content */
export const Icon: Story = {
  args: {
    content: 'icon',
    icon: <UserIcon style={{ width: 20, height: 20 }} />,
    size: '40px',
    variant: 'circular',
  },
};

/** Image content */
export const Image: Story = {
  args: {
    content: 'image',
    src: 'https://mui.com/static/images/avatar/1.jpg',
    size: '40px',
    variant: 'circular',
  },
};

/** Small size (18px) */
export const Small: Story = {
  args: {
    content: 'text',
    initials: 'OP',
    size: '18px',
    variant: 'circular',
  },
};

/** Medium sizes */
export const Size24: Story = {
  args: {
    content: 'text',
    initials: 'OP',
    size: '24px',
    variant: 'circular',
  },
};

export const Size32: Story = {
  args: {
    content: 'text',
    initials: 'OP',
    size: '32px',
    variant: 'circular',
  },
};

/** Rounded variant */
export const Rounded: Story = {
  args: {
    content: 'text',
    initials: 'OP',
    size: '40px',
    variant: 'rounded',
  },
};

/** Square variant */
export const Square: Story = {
  args: {
    content: 'text',
    initials: 'OP',
    size: '40px',
    variant: 'square',
  },
};

/** With badge */
export const WithBadge: Story = {
  args: {
    content: 'text',
    initials: 'OP',
    size: '40px',
    variant: 'circular',
    badge: true,
  },
};
