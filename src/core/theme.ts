import type { Theme, ThemeOptions } from '../types';
import type { Color } from '../types';
import { ContrastLevel, Variant } from './config';
import { createScheme } from './scheme.ts';
import { createCustomColor } from './color.ts';
import { TonalPalette } from '@material/material-color-utilities';
import { convertToArgb } from './conversion.ts';

/**
 * Creates a Material Design theme from a seed color or theme options.
 * Generates both light and dark scheme variants, color palettes, and handles custom colors.
 *
 * @example
 * // Using seed color with options
 * createTheme(0xff0000, { contrastLevel: ContrastLevel.HIGH });
 *
 * @example
 * // Using full options object
 * createTheme({
 *   seedColor: 0x00ff00,
 *   variant: Variant.EXPRESSIVE,
 *   customColors: [/* ... *\/]
 * });
 *
 * @returns {Theme} Complete theme object with light/dark schemes and palettes
 * @param seedColor
 * @param options
 */
export function createTheme(seedColor: Color, options?: Omit<ThemeOptions, 'seedColor'>): Theme;
export function createTheme(options: ThemeOptions): Theme;
export function createTheme(
  colorOrOptions: Color | ThemeOptions,
  maybeOptions?: Omit<ThemeOptions, 'seedColor'>,
): Theme {
  const options: ThemeOptions =
    typeof colorOrOptions === 'number' || typeof colorOrOptions === 'string'
      ? { ...maybeOptions, seedColor: colorOrOptions }
      : colorOrOptions;

  const {
    primary,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    contrastLevel = ContrastLevel.DEFAULT,
    variant = Variant.TONAL_SPOT,
    customColors = [],
  } = options;

  const seedColor = convertToArgb(options.seedColor ?? options.primary ?? 0);

  const newScheme = (isDark: boolean) =>
    createScheme({
      seedColor,
      isDark,
      primary,
      secondary,
      tertiary,
      neutral,
      neutralVariant,
      contrastLevel,
      variant,
    });

  const scheme = newScheme(false);
  const darkScheme = newScheme(true);

  const core = {
    a1: scheme.primaryPalette,
    a2: scheme.secondaryPalette,
    a3: scheme.tertiaryPalette,
    n1: scheme.neutralPalette,
    n2: scheme.neutralVariantPalette,
    error: scheme.errorPalette,
  };

  return {
    source: seedColor,
    contrastLevel,
    variant,
    schemes: {
      light: scheme,
      dark: darkScheme,
    },
    palettes: {
      primary: TonalPalette.fromInt(convertToArgb(primary || seedColor)),
      secondary: secondary ? TonalPalette.fromInt(convertToArgb(secondary)) : core.a2,
      tertiary: tertiary ? TonalPalette.fromInt(convertToArgb(tertiary)) : core.a3,
      neutral: neutral ? TonalPalette.fromInt(convertToArgb(neutral)) : core.n1,
      neutralVariant: neutralVariant
        ? TonalPalette.fromInt(convertToArgb(neutralVariant))
        : core.n2,
      error: core.error,
    },
    customColors: customColors.map((color) => createCustomColor(seedColor, color)),
  };
}
