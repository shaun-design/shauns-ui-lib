/**
 * Token build script
 *
 * Preserves token domains:
 * - palette.light, palette.dark (semantic colors by mode)
 * - primitives (raw color palettes)
 * - typography, spacing, shape, breakpoints
 *
 * Collision resolution: Light and dark are built separately (each merged with
 * primitives for alias resolution), then combined. No flattening collisions.
 */

import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { register, parseTokens } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

const SETS = {
  SEMANTIC_LIGHT: 'colors-semantic/light',
  SEMANTIC_DARK: 'colors-semantic/dark',
  PRIMITIVES: 'colors-primitive/Mode 1',
  BRAND: 'brand/Mode 1',
  TYPO_DESKTOP: 'typography/desktop',
  TYPO_MOBILE: 'typography/mobile',
  BREAKPOINTS: 'breakpoints/Mode 1',
  SPACING: 'spacing/Mode 1',
  SHAPE: 'shape/Mode 1',
};

const SEMANTIC_KEYS = [
  'text',
  'primary',
  'secondary',
  'action',
  'error',
  'warning',
  'info',
  'success',
  'common',
  'background',
  'divider',
  'footer',
];

const PRIMITIVE_KEYS = [
  'grey',
  'purple',
  'aqua',
  'red',
  'deepOrange',
  'lightBlue',
  'green',
  'orange',
  'indigo',
  'deepPurple',
  'amber',
  'pink',
  'lightGreen',
  'lime',
  'yellow',
  'cyan',
  'teal',
  'blueGrey',
];

register(StyleDictionary, { excludeParentKeys: true });

function mergeForResolution(raw, semanticSet) {
  return parseTokens(
    {
      [SETS.PRIMITIVES]: raw[SETS.PRIMITIVES] || {},
      [SETS.BRAND]: raw[SETS.BRAND] || {},
      [SETS.TYPO_DESKTOP]: raw[SETS.TYPO_DESKTOP] || {},
      [SETS.TYPO_MOBILE]: raw[SETS.TYPO_MOBILE] || {},
      [SETS.BREAKPOINTS]: raw[SETS.BREAKPOINTS] || {},
      [SETS.SPACING]: raw[SETS.SPACING] || {},
      [SETS.SHAPE]: raw[SETS.SHAPE] || {},
      [semanticSet]: raw[semanticSet] || {},
    },
    { excludeParentKeys: true }
  );
}

function extractSemantic(tokens) {
  const out = {};
  for (const key of SEMANTIC_KEYS) {
    if (tokens[key]) out[key] = tokens[key];
  }
  return out;
}

function extractPrimitives(tokens) {
  const out = {};
  for (const key of PRIMITIVE_KEYS) {
    if (tokens[key]) out[key] = tokens[key];
  }
  return out;
}

async function buildTokensFromFile(sourcePath) {
  const sd = new StyleDictionary({
    source: [sourcePath],
    preprocessors: ['tokens-studio'],
    platforms: {
      js: {
        transformGroup: 'tokens-studio',
        buildPath: resolve(process.cwd(), 'src/design-system/tokens/build'),
        files: [
          {
            destination: '__temp_tokens__.json',
            format: 'json/nested',
            filter: (token) => !token.path.some((p) => String(p).startsWith('_')),
          },
        ],
      },
    },
  });
  const dict = await sd.getPlatformTokens('js');
  return dict.tokens;
}

async function main() {
  const cwd = process.cwd();
  const raw = JSON.parse(readFileSync(resolve(cwd, 'tokens.json'), 'utf-8'));

  const tempDir = resolve(cwd, '.tmp-tokens');
  mkdirSync(tempDir, { recursive: true });

  const lightMerged = mergeForResolution(raw, SETS.SEMANTIC_LIGHT);
  const darkMerged = mergeForResolution(raw, SETS.SEMANTIC_DARK);
  const baseMerged = parseTokens(
    {
      [SETS.PRIMITIVES]: raw[SETS.PRIMITIVES] || {},
      [SETS.BRAND]: raw[SETS.BRAND] || {},
      [SETS.TYPO_DESKTOP]: raw[SETS.TYPO_DESKTOP] || {},
      [SETS.TYPO_MOBILE]: raw[SETS.TYPO_MOBILE] || {},
      [SETS.BREAKPOINTS]: raw[SETS.BREAKPOINTS] || {},
      [SETS.SPACING]: raw[SETS.SPACING] || {},
      [SETS.SHAPE]: raw[SETS.SHAPE] || {},
    },
    { excludeParentKeys: true }
  );

  const lightPath = resolve(tempDir, 'light.json');
  const darkPath = resolve(tempDir, 'dark.json');
  const basePath = resolve(tempDir, 'base.json');

  writeFileSync(lightPath, JSON.stringify({ merged: lightMerged }, null, 2));
  writeFileSync(darkPath, JSON.stringify({ merged: darkMerged }, null, 2));
  writeFileSync(basePath, JSON.stringify({ merged: baseMerged }, null, 2));

  let lightResolved, darkResolved, baseResolved;
  try {
    lightResolved = await buildTokensFromFile(lightPath);
  } catch (e) {
    console.error('Light build failed:', e.message);
    throw e;
  }
  try {
    darkResolved = await buildTokensFromFile(darkPath);
  } catch (e) {
    console.error('Dark build failed:', e.message);
    throw e;
  }
  try {
    baseResolved = await buildTokensFromFile(basePath);
  } catch (e) {
    console.error('Base build failed:', e.message);
    throw e;
  } finally {
    try {
      unlinkSync(lightPath);
      unlinkSync(darkPath);
      unlinkSync(basePath);
    } catch (_) {}
  }

  const primitives = extractPrimitives(baseResolved);
  const typography = {
    desktop: baseResolved[SETS.TYPO_DESKTOP] ?? baseResolved,
    mobile: raw[SETS.TYPO_MOBILE] || {},
  };
  const palette = {
    light: extractSemantic(lightResolved),
    dark: extractSemantic(darkResolved),
  };

  const output = {
    primitives,
    palette,
    typography,
    spacing: baseResolved.spacing || baseResolved,
    shape: baseResolved.shape || baseResolved,
    breakpoints: baseResolved.breakpoints || baseResolved,
  };

  const buildDir = resolve(cwd, 'src/design-system/tokens/build');
  const outPath = resolve(buildDir, 'tokens.ts');
  const content = `/**
 * Do not edit directly, this file was auto-generated.
 */

export default ${JSON.stringify(output, null, 2)};
`;
  writeFileSync(outPath, content);

  try {
    unlinkSync(resolve(buildDir, '__temp_tokens__.json'));
  } catch (_) {}
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
