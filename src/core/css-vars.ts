import { convertToHex } from './conversion';
import { formatCssVarName } from './formatting.ts';
import type { Color } from '../types';

// tooo: delete because of duplicate as in formatting.ts
export function colorSchemeToCssVars<T extends Record<string, Color>>(
  colorScheme: T,
  cssSelector?: string,
): string {
  const cssVars = Object.entries(colorScheme)
    .map(([key, value]) => `${formatCssVarName(key)}: ${convertToHex(value)};`)
    .join(' ');
  return cssSelector ? `${cssSelector} { ${cssVars} }` : cssVars;
}
