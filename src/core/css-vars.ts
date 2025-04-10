import type { Color } from '../types';
import { convertToHex } from './conversion.ts';
import { formatCssVarName } from './formatting.ts';

/**
 * Creates a mapping of CSS variable names to hex color values from a color scheme.
 *
 * @param colorScheme - An object mapping keys to color values
 * @returns A record of `--kebab-case-name` to hex value
 *
 * @example
 * buildCssVarMapping({ Primary: '#ff0000' })
 * // → { '--primary': '#ff0000' }
 */
export function buildCssVarMapping<T extends Record<string, Color>>(
  colorScheme: T,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(colorScheme).map(([key, value]) => [
      formatCssVarName(key),
      convertToHex(value),
    ]),
  );
}


/**
 * Converts a mapping of CSS variables to a CSS string.
 *
 * @param mapping - A record of CSS variable names to values
 * @param cssSelector - Optional selector to wrap the vars in
 * @returns A CSS string (with or without selector)
 *
 * @example
 * stringifyCssVarMapping({ '--primary': '#ff0000' })
 * // → "--primary: #ff0000;"
 *
 * @example
 * stringifyCssVarMapping({ '--primary': '#ff0000' }, ':root')
 * // → ":root { --primary: #ff0000; }"
 */
export function stringifyCssVarMapping(mapping: Record<string, string>, cssSelector?: string): string {
  const cssVars = Object.entries(mapping)
    .map(([name, value]) => `${name}: ${value};`)
    .join(' ');
  return cssSelector ? `${cssSelector} { ${cssVars} }` : cssVars;
}