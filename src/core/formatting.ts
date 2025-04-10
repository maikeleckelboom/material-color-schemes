import camelCase from 'camelcase';
import kebabCase from 'kebab-case';

export interface FormatOptions {
  prefix?: string;
  suffix?: string;
}

/**
 * Formats a token name with optional prefix and suffix, ensuring camelCase output.
 *
 * @param name - The base name of the token.
 * @param options - Optional prefix and suffix to prepend/append to the name.
 * @returns The combined name formatted in camelCase.
 *
 * @example
 * formatTokenName('button', { prefix: 'ui', suffix: 'large' }); // 'uiButtonLarge'
 */
export function formatTokenName(
  name: string,
  { prefix, suffix }: FormatOptions = {},
): string {
  return camelCase(`${prefix ? `${prefix}_` : ''}${name}${suffix ? `_${suffix}` : ''}`);
}

type CssVarName<T extends string> = `--${Lowercase<T>}`;

/**
 * Formats a string as a CSS custom property name (kebab-case with -- prefix).
 *
 * @param key - The name to convert to CSS variable format.
 * @returns The formatted CSS variable name.
 *
 * @example
 * formatCssVarName('primaryColor'); // '--primary-color'
 */
export function formatCssVarName<T extends string>(key: T): CssVarName<T> {
  return `--${kebabCase(key)}` as CssVarName<T>;
}

/**
 * Formats a pattern by replacing 'color' placeholders with a given color name,
 * optionally appending a suffix, and returning the result in camelCase.
 *
 * @param pattern - A template string containing 'color' (case-insensitive) as a placeholder.
 * @param name - The color name to interpolate into the pattern.
 * @param suffix - Optional suffix to append after the replacement.
 * @returns The resulting string formatted in camelCase.
 *
 * @example
 * formatColorPattern('onColorContainer', 'primary'); // 'onPrimaryContainer'
 * formatColorPattern('colorVariant', 'secondary', 'dark'); // 'secondaryVariantDark'
 */
export function formatColorPattern(
  pattern: string,
  name: string,
  suffix?: string,
): string {
  const formattedName = formatTokenName(name);
  let result = pattern.replace(/color/gi, formattedName);
  if (suffix) {
    result += `_${suffix}`;
  }
  return camelCase(result);
}
