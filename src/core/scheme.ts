import type { Color, CoreSchemeOptions, SchemeOptions } from '../types';
import { DynamicScheme, TonalPalette } from '@material/material-color-utilities';
import { createPalette } from './palette.ts';
import { ContrastLevel, mapVariantToScheme, Variant } from './config';
import { toArgb, toHct } from './conversion.ts';

/**
 * Generates a dynamic scheme based on provided configuration options.
 *
 * This function supports two overloads:
 * 1. Provide a source color with optional default options.
 * 2. Provide a comprehensive options object that may include multiple color overrides.
 *
 * When only a source (or primary) color is provided and no additional color options
 * (e.g. secondary, tertiary) are specified, the generated scheme will base all palettes
 * on that single source in combination with the default tonal palette.
 *
 * @overload
 * @param {Color} sourceColor - The source color used to generate the scheme.
 * @param {CoreSchemeOptions} [options] - Additional options to tweak the scheme.
 * @returns {DynamicScheme} The dynamic color scheme generated from the source color.
 *
 * @overload
 * @param {SchemeOptions} options - A comprehensive options object including the source color and optionally
 *                                  additional colors to override specific palettes.
 * @returns {DynamicScheme} The dynamic color scheme generated according to the given options.
 */
export function createScheme(
  sourceColor: Color,
  options?: CoreSchemeOptions,
): DynamicScheme;
export function createScheme(options: SchemeOptions): DynamicScheme;
export function createScheme(
  colorOrOptions: Color | SchemeOptions,
  maybeOptions?: CoreSchemeOptions,
): DynamicScheme {
  const options: SchemeOptions =
    typeof colorOrOptions === 'number' || typeof colorOrOptions === 'string'
      ? { ...maybeOptions, sourceColor: colorOrOptions }
      : colorOrOptions;

  const {
    isDark = false,
    contrastLevel = ContrastLevel.DEFAULT,
    variant = Variant.TONAL_SPOT,
  } = options;

  const sourceColorArgb = toArgb(options.sourceColor ?? options.primary ?? 0);

  const SchemeConstructor = mapVariantToScheme(variant);
  const scheme = new SchemeConstructor(toHct(sourceColorArgb), isDark, contrastLevel);

  if (isSchemeBasedOnSourceColor(options)) {
    return scheme;
  }

  const core = {
    a1: scheme.primaryPalette,
    a2: scheme.secondaryPalette,
    a3: scheme.tertiaryPalette,
    n1: scheme.neutralPalette,
    n2: scheme.neutralVariantPalette,
    error: scheme.errorPalette,
  };

  return new DynamicScheme({
    sourceColorArgb,
    isDark,
    contrastLevel,
    variant,
    primaryPalette: createTonalPalette(options.primary || options.sourceColor, core.a1),
    secondaryPalette: createTonalPalette(options.secondary, core.a2),
    tertiaryPalette: createTonalPalette(options.tertiary, core.a3),
    neutralPalette: createTonalPalette(options.neutral, core.n1),
    neutralVariantPalette: createTonalPalette(options.neutralVariant, core.n2),
  });
}

function createTonalPalette(color: Color | undefined, fallback: TonalPalette) {
  if (!color) return fallback;
  return createPalette(color);
}

function isSchemeBasedOnSourceColor(options: SchemeOptions): boolean {
  const hasColorSource = !!options.sourceColor || !!options.primary;
  return (
    hasColorSource &&
    !Object.values({
      secondary: options.secondary,
      tertiary: options.tertiary,
      neutral: options.neutral,
      neutralVariant: options.neutralVariant,
    }).some(Boolean)
  );
}
