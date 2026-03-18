/**
 * Creates MUI theme from design tokens.
 *
 * Theme: The set of colors, typography, spacing, etc. that MUI components use.
 * ThemeProvider: Wraps your app so all MUI components receive the theme.
 */

import { createTheme as muiCreateTheme, type ThemeOptions } from '@mui/material/styles';
import tokens from '@/design-system/tokens/build/tokens';
import { getTokenValue } from './tokenUtils';

type TokenObj = Record<string, unknown>;

function getColor(obj: TokenObj | undefined): string {
  const v = getTokenValue(obj as { $value?: string });
  return typeof v === 'string' ? v : '#000';
}

function getNumber(obj: TokenObj | undefined): number {
  const v = getTokenValue(obj as { $value?: number });
  return typeof v === 'number' ? v : 0;
}

function mapPalette(paletteTokens: TokenObj) {
  const primary = paletteTokens.primary as TokenObj;
  const secondary = paletteTokens.secondary as TokenObj;
  const error = paletteTokens.error as TokenObj;
  const warning = paletteTokens.warning as TokenObj;
  const success = paletteTokens.success as TokenObj;
  const info = paletteTokens.info as TokenObj;
  const text = paletteTokens.text as TokenObj;
  const background = paletteTokens.background as TokenObj;

  return {
    primary: {
      main: getColor(primary?.main as TokenObj),
      light: getColor(primary?.light as TokenObj),
      dark: getColor(primary?.dark as TokenObj),
      contrastText: getColor(primary?.contrastText as TokenObj),
    },
    secondary: {
      main: getColor(secondary?.main as TokenObj),
      light: getColor(secondary?.light as TokenObj),
      dark: getColor(secondary?.dark as TokenObj),
      contrastText: getColor(secondary?.contrastText as TokenObj),
    },
    error: {
      main: getColor(error?.main as TokenObj),
      light: getColor(error?.light as TokenObj),
      dark: getColor(error?.dark as TokenObj),
      contrastText: getColor(error?.contrastText as TokenObj),
    },
    warning: {
      main: getColor(warning?.main as TokenObj),
      light: getColor(warning?.light as TokenObj),
      dark: getColor(warning?.dark as TokenObj),
      contrastText: getColor(warning?.contrastText as TokenObj),
    },
    success: {
      main: getColor(success?.main as TokenObj),
      light: getColor(success?.light as TokenObj),
      dark: getColor(success?.dark as TokenObj),
      contrastText: getColor(success?.contrastText as TokenObj),
    },
    info: {
      main: getColor(info?.main as TokenObj),
      light: getColor(info?.light as TokenObj),
      dark: getColor(info?.dark as TokenObj),
      contrastText: getColor(info?.contrastText as TokenObj),
    },
    text: {
      primary: getColor(text?.primary as TokenObj),
      secondary: getColor(text?.secondary as TokenObj),
      disabled: getColor(text?.disabled as TokenObj),
    },
    background: {
      default: getColor(background?.default as TokenObj),
      paper: getColor(background?.paper as TokenObj),
    },
    divider: getColor(paletteTokens.divider as TokenObj),
  };
}

export function createTheme(mode: 'light' | 'dark') {
  const paletteTokens = tokens.palette[mode] as TokenObj;
  const typographyTokens = (tokens.typography?.desktop ?? tokens.typography) as TokenObj;
  const spacingTokens = tokens.spacing as TokenObj;
  const shapeTokens = tokens.shape as TokenObj;

  const baseUnit = getNumber(spacingTokens?.['spacing-1'] as TokenObj) || 8;
  const borderRadius = getNumber(shapeTokens?.['borderRadius-4'] as TokenObj) ?? getNumber(shapeTokens?.['none'] as TokenObj) ?? 4;

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      ...mapPalette(paletteTokens),
    },
    typography: {
      fontFamily: getTokenValue(typographyTokens?.fontFamily as TokenObj) as string || 'Nunito, sans-serif',
      fontWeightLight: getNumber(typographyTokens?.fontWeightLight as TokenObj) || 300,
      fontWeightRegular: getNumber(typographyTokens?.fontWeightRegular as TokenObj) || 400,
      fontWeightMedium: getNumber(typographyTokens?.fontWeightMedium as TokenObj) || 500,
      fontWeightBold: getNumber(typographyTokens?.fontWeightBold as TokenObj) || 700,
    },
    spacing: (factor: number) => factor * baseUnit,
    shape: {
      borderRadius,
    },
  };

  return muiCreateTheme(themeOptions);
}
