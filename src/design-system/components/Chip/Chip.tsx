/**
 * Chip component - uses MUI Chip with theme from tokens.
 */

import MuiChip, { type ChipProps } from '@mui/material/Chip';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';

export type ChipSize = 'small' | 'large';
export type ChipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type ChipVariant = 'filled' | 'outlined';

export interface ChipComponentProps extends Omit<ChipProps, 'size' | 'color' | 'variant'> {
  /** Size: 'small' | 'large' (large maps to MUI medium) */
  size?: ChipSize;
  /** Color from theme palette */
  color?: ChipColor;
  /** Variant: filled or outlined */
  variant?: ChipVariant;
  /** When true, shows delete icon. Pass onDelete for the callback. */
  deletable?: boolean;
  /** Optional icon or Avatar before the label. Pass <Avatar /> for user chips. */
  thumbnail?: ReactElement;
  /** Chip label text */
  label: string;
}

/**
 * Chip - compact element for tags, filters, or input chips.
 */
export function Chip({
  size = 'large',
  color = 'default',
  variant = 'filled',
  deletable = false,
  thumbnail,
  label,
  onDelete,
  disabled = false,
  ...rest
}: ChipComponentProps) {
  const muiSize = size === 'large' ? 'medium' : 'small';
  const avatarSize = size === 'small' ? 18 : 24;
  const { sx: restSx, ...restProps } = rest;

  const avatarElement = thumbnail ? (
    <Box
      component="span"
      sx={{
        marginLeft: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: avatarSize,
        height: avatarSize,
        flexShrink: 0,
        overflow: 'hidden',
        borderRadius: '50%',
        '& > *': {
          width: `${avatarSize}px !important`,
          height: `${avatarSize}px !important`,
          minWidth: `${avatarSize}px !important`,
          minHeight: `${avatarSize}px !important`,
        },
        '& .MuiAvatar-root': {
          width: `${avatarSize}px !important`,
          height: `${avatarSize}px !important`,
          minWidth: `${avatarSize}px !important`,
          minHeight: `${avatarSize}px !important`,
        },
      }}
    >
      {thumbnail}
    </Box>
  ) : undefined;

  return (
    <MuiChip
      size={muiSize}
      color={color}
      variant={variant}
      avatar={avatarElement}
      label={label}
      disabled={disabled}
      onDelete={deletable ? (onDelete ?? (() => {})) : undefined}
      sx={{
        ...(typeof restSx === 'object' && restSx ? restSx : {}),
      }}
      {...restProps}
    />
  );
}

export default Chip;
