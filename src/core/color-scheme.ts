import camelcase from 'camelcase';
import { type CustomColorGroup, DynamicScheme } from '@material/material-color-utilities';
import type { ColorScheme, ColorSchemeOptions, ColorSchemeReturnType, Theme } from '../types';
import { COLOR_SCHEME_KEYS } from '../constants';
import { formatColorName } from './format.ts';

/**
 * Generates a color scheme from a Theme or DynamicScheme object, with support for dark mode,
 * brightness variants, and custom color modifications.
 *
 * @template V - Boolean type indicating whether brightness variants are included (extends boolean, defaults to false)
 * @param theme
 * @param {ColorSchemeOptions<V>} [options] - Configuration options for the color scheme
 * @param {boolean} [options.dark=false] - Whether to use dark mode variant
 * @param {boolean} [options.brightnessVariants=false] - Whether to include light/dark brightness variants
 * @param {function} [options.modifyColorScheme] - Optional callback to modify the color scheme before returning
 * @returns {ColorSchemeReturnType<V>} A color scheme object containing color values as numbers. When brightnessVariants
 * is true, colors will have 'Light' and 'Dark' suffix variants (e.g., 'primaryLight', 'primaryDark').
 *
 * @example
 * // Basic usage with default theme
 * const scheme = createColorScheme(theme);
 *
 * @example
 * // With dark mode and brightness variants
 * const scheme = createColorScheme(theme, { dark: true, brightnessVariants: true });
 *
 * @example
 * // With custom color modification
 * const scheme = createColorScheme(theme, {
 *   modifyColorScheme: (colors) => ({ ...colors, customColor: 0xFF0000 })
 * });
 */
export function createColorScheme<V extends boolean = false>(
  theme: Theme,
  options?: ColorSchemeOptions<V>,
): ColorSchemeReturnType<V>;

export function createColorScheme(scheme: DynamicScheme, options?: ColorSchemeOptions): ColorScheme;

export function createColorScheme(
  input: Theme | DynamicScheme,
  options?: ColorSchemeOptions,
): ColorScheme {
  if ('schemes' in input) {
    const theme = input as Theme;
    const themeOptions = options as ColorSchemeOptions;
    const { dark = false, brightnessVariants = false, modifyColorScheme } = themeOptions || {};
    const scheme = dark ? theme.schemes.dark : theme.schemes.light;

    const colors = getColorsFromScheme(scheme);
    const customColors = getCustomColorsFromTheme(theme, options);

    let colorScheme: ColorScheme = {
      ...colors,
      ...customColors,
    };

    if (brightnessVariants) {
      const lightColors = getColorsFromScheme(theme.schemes.light, 'light');
      const darkColors = getColorsFromScheme(theme.schemes.dark, 'dark');
      colorScheme = {
        ...colorScheme,
        ...lightColors,
        ...darkColors,
      };
    }

    const result = modifyColorScheme ? modifyColorScheme(colorScheme) : colorScheme;
    return result as ColorSchemeReturnType<typeof brightnessVariants>;
  } else {
    const scheme = input as DynamicScheme;
    const schemeOptions = options as { modifyColorScheme?: (cs: ColorScheme) => ColorScheme };
    let result: ColorScheme = getColorsFromScheme(scheme);
    if (schemeOptions?.modifyColorScheme) {
      result = schemeOptions.modifyColorScheme(result);
    }
    return result;
  }
}

function getColorsFromScheme(scheme: DynamicScheme, suffix?: string) {
  const colors: Record<string, number> = {};
  COLOR_SCHEME_KEYS.forEach((key) => {
    colors[camelcase(key + (suffix ? `_${suffix}` : ''))] = scheme[key];
  });
  return colors;
}

function getColorsFromCustomColor<V extends boolean>(
  colorGroup: CustomColorGroup,
  options: ColorSchemeOptions<V> = {},
) {
  const { dark = false, brightnessVariants = true } = options;
  const variants: { type: 'light' | 'dark'; suffix?: string }[] = [];
  variants.push({ type: dark ? 'dark' : 'light' });
  if (brightnessVariants) {
    variants.push({ type: 'light', suffix: `light` }, { type: 'dark', suffix: `dark` });
  }
  const colors: Record<string, number> = {};
  for (const { type, suffix: variantSuffix } of variants) {
    for (const [pattern, value] of Object.entries(colorGroup[type as 'light' | 'dark'])) {
      const token = formatColorName(pattern, colorGroup.color.name, variantSuffix);
      colors[token] = value;
    }
  }
  return colors;
}

function getCustomColorsFromTheme<V extends boolean>(
  theme: Theme,
  options?: ColorSchemeOptions<V>,
) {
  return Object.assign(
    {},
    ...theme.customColors.map((customColor) => getColorsFromCustomColor(customColor, options)),
  );
}
