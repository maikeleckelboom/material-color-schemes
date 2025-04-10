import camelcase from 'camelcase';
import { type CustomColorGroup, DynamicScheme } from '@material/material-color-utilities';
import type { ColorScheme, ColorSchemeOptions, ColorSchemeReturnType, Theme } from '../types';
import { COLOR_SCHEME_KEYS } from '../constants';
import { formatColorName } from './formatting.ts';

/**
 * Generates a color scheme from a Theme or DynamicScheme, supporting dark mode,
 * brightness variants, and custom color modifications.
 *
 * @template {boolean} [V=false] Whether brightness variants are included
 * @param {Theme | DynamicScheme} source Color scheme source data
 * @param {ColorSchemeOptions<V extends boolean>} [options] Configuration options
 * @param {boolean} [options.dark=false] Enable dark mode variant
 * @param {boolean} [options.brightnessVariants=false] Include light/dark variants
 * @param {function(ColorScheme): ColorScheme} [options.modifyColorScheme] Color scheme modifier
 * @returns {ColorSchemeReturnType<V extends boolean>} Color scheme with numeric color values
 *
 * @example
 * // Basic usage with default theme
 * const scheme = createColorScheme(theme);
 *
 * @example
 * // Dark mode with brightness variants
 * const scheme = createColorScheme(theme, { dark: true, brightnessVariants: true });
 *
 * @example
 * // Custom color modification
 * const scheme = createColorScheme(theme, {
 *   modifyColorScheme: colors => ({ ...colors, accent: 0x00FF00 })
 * });
 */
export function createColorScheme<V extends boolean = false>(
  source: Theme,
  options?: ColorSchemeOptions<V>,
): ColorSchemeReturnType<V>;
export function createColorScheme(
  source: DynamicScheme,
  options?: ColorSchemeOptions,
): ColorScheme;
export function createColorScheme(
  source: Theme | DynamicScheme,
  options?: ColorSchemeOptions,
): ColorScheme {
  return isTheme(source)
    ? createFromTheme(source, options)
    : createFromScheme(source, options);
}

/** Type guard for Theme detection */
function isTheme(source: Theme | DynamicScheme): source is Theme {
  return 'schemes' in source;
}

/** Handles Theme-based color scheme creation */
function createFromTheme(theme: Theme, options?: ColorSchemeOptions): ColorScheme {
  const {
    dark = false,
    brightnessVariants = false,
    modifyColorScheme,
  } = options || {};

  const baseScheme = dark ? theme.schemes.dark : theme.schemes.light;
  const colorScheme = mergeColorSources(
    getColorsFromScheme(baseScheme),
    getCustomColorsFromTheme(theme, options),
  );

  const fullScheme = brightnessVariants
    ? mergeColorSources(
      colorScheme,
      getColorsFromScheme(theme.schemes.light, 'light'),
      getColorsFromScheme(theme.schemes.dark, 'dark'),
    )
    : colorScheme;

  return applyColorModifier(fullScheme, modifyColorScheme);
}

/** Handles DynamicScheme-based color scheme creation */
function createFromScheme(
  scheme: DynamicScheme,
  options?: ColorSchemeOptions,
): ColorScheme {
  const baseScheme = getColorsFromScheme(scheme);
  return applyColorModifier(baseScheme, options?.modifyColorScheme);
}

/** Applies color modification callback if provided */
function applyColorModifier(
  scheme: ColorScheme,
  modifier?: (colors: ColorScheme) => ColorScheme,
): ColorScheme {
  return modifier ? modifier(scheme) : scheme;
}

/** Merges multiple color sources into single scheme */
function mergeColorSources(...sources: ColorScheme[]): ColorScheme {
  return Object.assign({}, ...sources);
}

/**
 * Extracts color values from a DynamicScheme with optional suffix
 * @param scheme Color scheme source
 * @param suffix Optional suffix to append to color names
 */
function getColorsFromScheme(scheme: DynamicScheme, suffix?: string): ColorScheme {
  const colors: ColorScheme = {};

  COLOR_SCHEME_KEYS.forEach((key) => {
    const colorName = camelcase(key + (suffix ? `_${suffix}` : ''));
    colors[colorName] = scheme[key];
  });

  return colors;
}


/**
 * Generates color variants for a custom color group
 * @param colorGroup Custom color configuration
 * @param options Color scheme options
 */
function getColorsFromCustomColor(
  colorGroup: CustomColorGroup,
  options: ColorSchemeOptions = {},
): ColorScheme {
  const { dark = false, brightnessVariants = false } = options;
  const variants: Array<{ type: 'light' | 'dark'; suffix?: string }> = [];

  // Base variant
  variants.push({ type: dark ? 'dark' : 'light' });

  // Brightness variants if enabled
  if (brightnessVariants) {
    variants.push(
      { type: 'light', suffix: 'Light' },
      { type: 'dark', suffix: 'Dark' },
    );
  }

  const colors: ColorScheme = {};

  for (const { type, suffix } of variants) {
    const colorVariant = colorGroup[type];

    for (const [pattern, value] of Object.entries(colorVariant)) {
      const tokenName = formatColorName(pattern, colorGroup.color.name, suffix);
      colors[tokenName] = value;
    }
  }

  return colors;
}


/**
 * Aggregates custom colors from a theme
 * @param theme Source theme object
 * @param options Color scheme options
 */
function getCustomColorsFromTheme(
  theme: Theme,
  options?: ColorSchemeOptions,
): ColorScheme {
  return mergeColorSources(
    ...theme.customColors.map(customColor =>
      getColorsFromCustomColor(customColor, options),
    ),
  );
}