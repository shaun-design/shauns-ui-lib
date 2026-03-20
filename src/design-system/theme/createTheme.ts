/**
 * Creates MUI theme from design tokens.
 *
 * Figma is the source of truth. Typography (text styles) and shape (border radius)
 * come from tokens.json → build-tokens → theme. No hardcoded values.
 *
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

/** Extract borderRadius from tokens (Figma shape). Tries shape, shape/Mode 1, spacing. */
function getBorderRadius(): number {
  const shape = tokens.shape as TokenObj;
  const spacing = tokens.spacing as TokenObj;
  const shapeMode = shape?.['shape/Mode 1'] as TokenObj;
  const val =
    getNumber(shape?.['borderRadius-4'] as TokenObj) ??
    getNumber(shapeMode?.['borderRadius-4'] as TokenObj) ??
    getNumber(spacing?.['borderRadius-4'] as TokenObj) ??
    getNumber(shape?.['none'] as TokenObj) ??
    4;
  return val;
}

/** Extract pill radius from tokens (Figma shape) for pill-shaped buttons. */
function getPillRadius(): number {
  const shape = tokens.shape as TokenObj;
  const spacing = tokens.spacing as TokenObj;
  const shapeMode = shape?.['shape/Mode 1'] as TokenObj;
  const val =
    getNumber(shape?.['pill'] as TokenObj) ??
    getNumber(shapeMode?.['pill'] as TokenObj) ??
    getNumber(spacing?.['pill'] as TokenObj) ??
    9999;
  return val;
}

/** Build MUI typography from Figma text styles (typography.typography in tokens). */
function mapTypography(typographyTokens: TokenObj) {
  const fontFamily = (getTokenValue(typographyTokens?.fontFamily as TokenObj) as string) || 'Nunito, sans-serif';
  const fontWeightLight = getNumber(typographyTokens?.fontWeightLight as TokenObj) || 300;
  const fontWeightRegular = getNumber(typographyTokens?.fontWeightRegular as TokenObj) || 400;
  const fontWeightMedium = getNumber(typographyTokens?.fontWeightMedium as TokenObj) || 500;
  const fontWeightBold = getNumber(typographyTokens?.fontWeightBold as TokenObj) || 700;

  const typo = typographyTokens?.typography as TokenObj;
  const fontSize = typographyTokens?.fontSize as TokenObj;
  const getFontSize = (key: string) => getNumber(typo?.[key] as TokenObj);
  const body1Size = getFontSize('body1') || getNumber(fontSize?.base as TokenObj) || 16;
  const body2Size = getFontSize('body2') || getNumber(fontSize?.md as TokenObj) || 14;

  return {
    fontFamily,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    h1: { fontFamily, fontSize: getFontSize('h1') || 96, fontWeight: fontWeightLight },
    h2: { fontFamily, fontSize: getFontSize('h2') || 60, fontWeight: fontWeightLight },
    h3: { fontFamily, fontSize: getFontSize('h3') || 48, fontWeight: fontWeightRegular },
    h4: { fontFamily, fontSize: getFontSize('h4') || 34, fontWeight: fontWeightRegular },
    h5: { fontFamily, fontSize: getFontSize('h5') || 24, fontWeight: fontWeightRegular },
    h6: { fontFamily, fontSize: getFontSize('h6') || 20, fontWeight: fontWeightMedium },
    subtitle1: { fontFamily, fontSize: body1Size, fontWeight: fontWeightRegular },
    subtitle2: { fontFamily, fontSize: body2Size, fontWeight: fontWeightMedium },
    body1: { fontFamily, fontSize: body1Size, fontWeight: fontWeightRegular },
    body2: { fontFamily, fontSize: body2Size, fontWeight: fontWeightRegular },
    button: { fontFamily, fontSize: body2Size, fontWeight: fontWeightMedium },
    caption: { fontFamily, fontSize: getFontSize('caption') || getNumber(fontSize?.sm as TokenObj) || 12, fontWeight: fontWeightRegular },
    overline: { fontFamily, fontSize: getFontSize('overline') || 12, fontWeight: fontWeightMedium },
  };
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

  const baseUnit = getNumber(spacingTokens?.['spacing-1'] as TokenObj) || 8;
  const borderRadius = getBorderRadius();
  const pillRadius = getPillRadius();

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      ...mapPalette(paletteTokens),
    },
    typography: mapTypography(typographyTokens),
    spacing: (factor: number) => factor * baseUnit,
    shape: {
      borderRadius,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: pillRadius,
            textTransform: 'none',
          },
        },
      },
    },
  };

  return muiCreateTheme(themeOptions);
}
