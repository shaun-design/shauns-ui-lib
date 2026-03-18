/**
 * Helpers to extract values from design tokens.
 * Tokens have nested structure with $value at leaf nodes.
 */

type TokenNode = {
  $value?: unknown;
  [key: string]: unknown;
};

/**
 * Get the resolved value from a token.
 * If the node has $value, return it. Otherwise recurse into children.
 */
export function getTokenValue(node: TokenNode | undefined): unknown {
  if (!node) return undefined;
  if (Object.prototype.hasOwnProperty.call(node, '$value')) return node.$value;
  return node;
}

/**
 * Map a token object to plain values (extract $value at leaves).
 */
export function tokensToPlain(obj: TokenNode | undefined): Record<string, unknown> | unknown {
  if (!obj || typeof obj !== 'object') return obj;
  if (Object.prototype.hasOwnProperty.call(obj, '$value')) return obj.$value;

  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$') || key.startsWith('_')) continue;
    const plain = tokensToPlain(val as TokenNode);
    if (plain !== undefined) result[key] = plain;
  }
  return result;
}
