import { convertToHex } from './conversion';
import { formatCssVarName } from './format.ts';
import type { Color } from '../types';

export function colorSchemeToCssVars<T extends Record<string, Color>>(
  colorScheme: T,
  cssSelector?: string,
): string {
  const cssVars = Object.entries(colorScheme)
    .map(([key, value]) => `${formatCssVarName(key)}: ${convertToHex(value)};`)
    .join(' ');
  return cssSelector ? `${cssSelector} { ${cssVars} }` : cssVars;
}
