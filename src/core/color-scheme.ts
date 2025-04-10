import { DynamicScheme } from '@material/material-color-utilities';
import type {
  ColorScheme,
  ColorSchemeOptions,
  ColorSchemeReturnType,
  Theme,
} from '../types';
import { COLOR_SCHEME_KEYS } from '../constants';
import { formatColorPattern, formatTokenName } from './formatting.ts';
import { extractPaletteColors } from './palette.ts';

/**
 * Generates a color scheme from a Theme or DynamicScheme, supporting dark mode,
 * brightness variants, and custom color modifications.
 *
 * @template {boolean} [V=false] Whether brightness variants are included
 * @param {Theme | DynamicScheme} source Color scheme source data
 * @param {ColorSchemeOptions<V extends boolean>} [options] Configuration options
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
  return 'schemes' in source
    ? createFromTheme(source, options)
    : createFromScheme(source, options);
}

function createFromTheme(theme: Theme, options: ColorSchemeOptions = {}): ColorScheme {
  const {
    dark = false,
    brightnessVariants = false,
    paletteTones,
    modifyColorScheme,
  } = options;

  const baseScheme = dark ? theme.schemes.dark : theme.schemes.light;

  const scheme: ColorScheme = {};

  if (paletteTones) {
    Object.assign(scheme, derivePaletteColorsFromTheme(theme, paletteTones));
  }

  Object.assign(
    scheme,
    deriveColorsFromScheme(baseScheme),
    deriveCustomColorsFromTheme(theme, options),
  );

  if (brightnessVariants) {
    Object.assign(
      scheme,
      deriveColorsFromScheme(theme.schemes.light, 'light'),
      deriveColorsFromScheme(theme.schemes.dark, 'dark'),
    );
  }

  return modifyColorScheme?.(scheme) ?? scheme;
}

function createFromScheme(
  scheme: DynamicScheme,
  options?: ColorSchemeOptions,
): ColorScheme {
  return (
    options?.modifyColorScheme?.(deriveColorsFromScheme(scheme)) ??
    deriveColorsFromScheme(scheme)
  );
}

export function deriveCustomColorsFromTheme(
  theme: Theme,
  options: ColorSchemeOptions = {},
): ColorScheme {
  const customColors: ColorScheme[] = [];

  for (const customColor of theme.customColors) {
    const variants: { type: 'light' | 'dark'; suffix?: string }[] = [
      { type: options.dark ? 'dark' : 'light' },
    ];

    if (options.brightnessVariants) {
      variants.push({ type: 'light', suffix: 'Light' }, { type: 'dark', suffix: 'Dark' });
    }

    const colorGroup: ColorScheme = {};

    for (const { type, suffix } of variants) {
      const colorVariant = customColor[type];
      for (const [pattern, value] of Object.entries(colorVariant)) {
        colorGroup[formatColorPattern(pattern, customColor.color.name, suffix)] = value;
      }
    }

    customColors.push(colorGroup);
  }

  return Object.assign({}, ...customColors);
}

export function derivePaletteColorsFromTheme(theme: Theme, tones: number[]) {
  const tonalColors: Record<string, string> = {};
  for (const [name, palette] of Object.entries(theme.palettes)) {
    const paletteColors = extractPaletteColors(palette, tones);
    Object.assign(tonalColors, mapPaletteToTonalKeys(name, paletteColors));
  }
  return tonalColors;
}

export function mapPaletteToTonalKeys(
  paletteName: string,
  paletteColors: Record<number, number>,
) {
  const tonalKeys: Record<string, number> = {};
  for (const [tone, color] of Object.entries(paletteColors)) {
    const key = formatTokenName(paletteName, { suffix: tone });
    tonalKeys[key] = color;
  }
  return tonalKeys;
}

export function deriveColorsFromScheme(
  scheme: DynamicScheme,
  suffix?: string,
): ColorScheme {
  return COLOR_SCHEME_KEYS.reduce((acc, key) => {
    const colorName = formatTokenName(key, { suffix });
    acc[colorName] = scheme[key];
    return acc;
  }, {} as ColorScheme);
}
