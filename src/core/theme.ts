import type { Theme, ThemeOptions } from '../types';
import type { Color } from '../types';
import { ContrastLevel, Variant } from './config';
import { createScheme } from './scheme.ts';
import { createCustomColor } from './color.ts';
import { TonalPalette } from '@material/material-color-utilities';
import { toArgb } from './conversion.ts';

/**
 * Creates a Material Design theme from a source color or theme options.
 * Generates both light and dark scheme variants, color palettes, and handles custom colors.
 *
 * @example
 * // Using source color with options
 * createTheme(0xff0000, { contrastLevel: ContrastLevel.HIGH });
 *
 * @example
 * // Using full options object
 * createTheme({
 *   sourceColor: 0x00ff00,
 *   variant: Variant.EXPRESSIVE,
 *   staticColors: [/* ... *\/]
 * });
 *
 * @returns {Theme} Complete theme object with light/dark schemes and palettes
 * @param sourceColor
 * @param options
 */
export function createTheme(
  sourceColor: Color,
  options?: Omit<ThemeOptions, 'sourceColor'>,
): Theme;
export function createTheme(options: ThemeOptions): Theme;
export function createTheme(
  colorOrOptions: Color | ThemeOptions,
  maybeOptions?: Omit<ThemeOptions, 'sourceColor'>,
): Theme {
  const options: ThemeOptions =
    typeof colorOrOptions === 'number' || typeof colorOrOptions === 'string'
      ? { ...maybeOptions, sourceColor: colorOrOptions }
      : colorOrOptions;

  const {
    primary,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    contrastLevel = ContrastLevel.DEFAULT,
    variant = Variant.TONAL_SPOT,
    staticColors = [],
  } = options;

  const sourceColor = toArgb(options.sourceColor ?? options.primary ?? 0);

  const newScheme = (isDark: boolean) =>
    createScheme({
      sourceColor,
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
    source: sourceColor,
    contrastLevel,
    variant,
    schemes: {
      light: scheme,
      dark: darkScheme,
    },
    palettes: {
      primary: TonalPalette.fromInt(toArgb(primary || sourceColor)),
      secondary: secondary ? TonalPalette.fromInt(toArgb(secondary)) : core.a2,
      tertiary: tertiary ? TonalPalette.fromInt(toArgb(tertiary)) : core.a3,
      neutral: neutral ? TonalPalette.fromInt(toArgb(neutral)) : core.n1,
      neutralVariant: neutralVariant
        ? TonalPalette.fromInt(toArgb(neutralVariant))
        : core.n2,
      error: core.error,
    },
    customColors: staticColors.map((color) => createCustomColor(sourceColor, color)),
  };
}
