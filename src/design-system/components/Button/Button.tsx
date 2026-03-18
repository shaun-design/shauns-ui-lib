/**
 * Button component - uses MUI Button with theme from tokens.
 *
 * The theme provides colors (primary, secondary), spacing, and shape.
 * MUI Button reads theme.palette.primary.main for its background, etc.
 */

import MuiButton, { type ButtonProps } from '@mui/material/Button';

export function Button(props: ButtonProps) {
  return <MuiButton {...props} />;
}

export default Button;
