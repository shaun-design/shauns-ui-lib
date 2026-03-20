/**
 * Button component - uses MUI Button with theme from tokens.
 *
 * Props map to your Figma component API. All styling comes from the
 * design pipeline (theme.palette, theme.typography, theme.spacing).
 */

import MuiButton, { type ButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'inherit';
export type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface ButtonComponentProps extends Omit<ButtonProps, 'size' | 'color' | 'variant'> {
  /** Size: small, medium, or large */
  size?: ButtonSize;
  /** Color from theme palette */
  color?: ButtonColor;
  /** Variant: contained, outlined, or text */
  variant?: ButtonVariant;
  /** Icon before the label (maps to Figma "Icon Start" boolean + Start Icon slot) */
  startIcon?: ReactNode;
  /** Icon after the label (maps to Figma "End Icon" boolean + End Icon slot) */
  endIcon?: ReactNode;
  /** Button label text */
  children: ReactNode;
}

/**
 * Button - primary action trigger.
 * Uses MUI theme for colors, typography, and spacing.
 */
export function Button({
  size = 'medium',
  color = 'primary',
  variant = 'contained',
  startIcon,
  endIcon,
  children,
  disabled = false,
  ...rest
}: ButtonComponentProps) {
  return (
    <MuiButton
      size={size}
      color={color}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      {...rest}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
