/**
 * Chip component - uses MUI Chip with theme from tokens.
 *
 * Props map to your Figma component API. All styling comes from the
 * design pipeline (theme.palette, theme.typography, theme.spacing).
 */

import MuiChip, { type ChipProps } from '@mui/material/Chip';
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
  /** Optional icon or avatar before the label (React element) */
  thumbnail?: ReactElement;
  /** Chip label text */
  label: string;
}

/**
 * Chip - compact element for tags, filters, or input chips.
 * Uses MUI theme for colors, typography, and spacing.
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

  return (
    <MuiChip
      size={muiSize}
      color={color}
      variant={variant}
      label={label}
      disabled={disabled}
      onDelete={deletable ? (onDelete ?? (() => {})) : undefined}
      icon={thumbnail}
      {...rest}
    />
  );
}

export default Chip;
