/**
 * Avatar component - uses MUI Avatar with theme from tokens.
 *
 * Props map to your Figma component API. All styling comes from the
 * design pipeline (theme.palette, theme.typography, theme.spacing).
 */

import MuiAvatar from '@mui/material/Avatar';
import MuiBadge from '@mui/material/Badge';
import { UserIcon } from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';

const DEFAULT_IMAGE = 'https://mui.com/static/images/avatar/1.jpg';

export type AvatarContent = 'text' | 'icon' | 'image';
export type AvatarSize = '18px' | '24px' | '32px' | '40px';
export type AvatarVariant = 'circular' | 'rounded' | 'square';

export interface AvatarProps {
  /** Content type: initials, icon, or image */
  content?: AvatarContent;
  /** Initials when content='text' */
  initials?: string;
  /** Image URL when content='image' */
  src?: string;
  /** Icon element when content='icon' */
  icon?: ReactNode;
  /** Size in pixels */
  size?: AvatarSize;
  /** Shape variant */
  variant?: AvatarVariant;
  /** Show status badge (green dot) */
  badge?: boolean;
}

const SIZE_MAP: Record<AvatarSize, number> = {
  '18px': 18,
  '24px': 24,
  '32px': 32,
  '40px': 40,
};

/** Font sizes for initials, from Figma (avatar/initialsSm, initialsMd, initialsLg) */
const INITIALS_FONT_SIZE: Record<AvatarSize, number> = {
  '18px': 10,  // avatar/initialsSm → fontSize.xs
  '24px': 12,  // avatar/initialsMd → fontSize.sm
  '32px': 20,  // avatar/initialsLg → fontSize.xl (per Figma)
  '40px': 20,  // avatar/initialsLg → fontSize.xl
};

/**
 * Avatar - displays user initials, icon, or image.
 * Uses MUI theme for colors and typography.
 */
export function Avatar({
  content = 'text',
  initials = 'OP',
  src,
  icon,
  size = '40px',
  variant = 'circular',
  badge = false,
}: AvatarProps) {
  const px = SIZE_MAP[size];
  const iconSize = Math.round(px * 0.5);
  const defaultIcon = <UserIcon style={{ width: iconSize, height: iconSize }} />;

  const baseSx = { width: px, height: px };
  const textSx = content === 'text' ? { ...baseSx, fontSize: INITIALS_FONT_SIZE[size] } : baseSx;

  const avatarContent =
    content === 'image' ? (
      <MuiAvatar src={src || DEFAULT_IMAGE} alt="" variant={variant} sx={baseSx} />
    ) : content === 'icon' ? (
      <MuiAvatar variant={variant} sx={baseSx}>
        {icon ?? defaultIcon}
      </MuiAvatar>
    ) : (
      <MuiAvatar variant={variant} sx={textSx}>
        {initials}
      </MuiAvatar>
    );

  if (badge) {
    return (
      <MuiBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="success"
        sx={{
          '& .MuiBadge-badge': {
            width: 8,
            height: 8,
            borderRadius: '50%',
          },
        }}
      >
        {avatarContent}
      </MuiBadge>
    );
  }

  return avatarContent;
}

export default Avatar;
