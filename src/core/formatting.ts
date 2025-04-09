import camelCase from 'camelcase';
import kebabCase from 'kebab-case';
import type { Color } from '../types';
import { convertToHex } from './conversion.ts';

/**
 * Format color name using template pattern
 *
 * @param pattern The example template pattern to format the color name to
 * @param name The default name to use in the template
 * @param suffix The suffix to append to the formatted name
 * @returns The formatted color name
 */
export function formatColorName(pattern: string, name: string, suffix?: string) {
  return camelCase(
    `${pattern
      .replace(/([A-Z])/g, `_$1`)
      .toLowerCase()
      .replace(/color/g, camelCase(name))}${suffix ? `_${suffix}` : ''}`,
  );
}

export type CssVarName<T extends string> = `--${Lowercase<T>}`;

/**
 * Format to a CSS variable name
 *
 * @param key The key to format
 * @returns The formatted CSS variable name
 */
export function formatCssVarName<T extends string>(key: T): CssVarName<T> {
  return `--${kebabCase(key)}` as CssVarName<T>;
}

export function formatCssVars<T extends Record<string, Color>>(
  colorScheme: T,
  cssSelector?: string,
): string {
  const cssVars = Object.entries(colorScheme)
    .map(([key, value]) => `${formatCssVarName(key)}: ${convertToHex(value)};`)
    .join(' ');
  return cssSelector ? `${cssSelector} { ${cssVars} }` : cssVars;
}
