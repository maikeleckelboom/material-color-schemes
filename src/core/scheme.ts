import type {Color} from "../types/color.ts";
import {DynamicScheme, TonalPalette} from "@material/material-color-utilities";
import {createTonalPalette} from "./palette.ts";
import type {DefaultSchemeOptions, SchemeOptions} from "../types";
import {mapVariantToScheme, Variant} from "./config/variant.ts";
import {convertToArgb, convertToHct} from "./conversion.ts";
import {ContrastLevel} from "./config";

/**
 * Generates a dynamic color scheme based on provided configuration options.
 *
 * This function supports two overloads:
 * 1. Provide a seed color with optional default options.
 * 2. Provide a comprehensive options object that may include multiple color overrides.
 *
 * When only a seed (or primary) color is provided and no additional color options
 * (e.g. secondary, tertiary) are specified, the generated scheme will base all palettes
 * on that single source.
 *
 * @overload
 * @param {Color} seedColor - The seed color used to generate the scheme.
 * @param {DefaultSchemeOptions} [options] - Additional options to tweak the scheme.
 * @returns {DynamicScheme} The dynamic color scheme generated from the seed color.
 *
 * @overload
 * @param {SchemeOptions} options - A comprehensive options object including the seed color and optionally
 *                                  additional colors to override specific palettes.
 * @returns {DynamicScheme} The dynamic color scheme generated according to the given options.
 */
export function createDynamicScheme(seedColor: Color, options?: DefaultSchemeOptions): DynamicScheme
export function createDynamicScheme(options: SchemeOptions): DynamicScheme
export function createDynamicScheme(
    colorOrOptions: Color | SchemeOptions,
    maybeOptions?: DefaultSchemeOptions,
): DynamicScheme {
    const options: SchemeOptions =
        typeof colorOrOptions === 'number' || typeof colorOrOptions === 'string'
            ? {...maybeOptions, seedColor: colorOrOptions}
            : colorOrOptions

    const {contrastLevel = ContrastLevel.DEFAULT, isDark = false, variant = Variant.TONAL_SPOT} = options

    const sourceColorArgb = convertToArgb(options.seedColor || options.primary || 0)

    const SchemeConstructor = mapVariantToScheme(variant)
    const scheme = new SchemeConstructor(convertToHct(sourceColorArgb), isDark, contrastLevel)

    if (isSchemeBasedOnSeedColor(options)) {
        return scheme
    }

    const core = {
        a1: scheme.primaryPalette,
        a2: scheme.secondaryPalette,
        a3: scheme.tertiaryPalette,
        n1: scheme.neutralPalette,
        n2: scheme.neutralVariantPalette,
        error: scheme.errorPalette,
    }

    return new DynamicScheme({
        sourceColorArgb,
        isDark,
        contrastLevel,
        variant,
        primaryPalette: createPalette(options.primary || options.seedColor, core.a1),
        secondaryPalette: createPalette(options.secondary, core.a2),
        tertiaryPalette: createPalette(options.tertiary, core.a3),
        neutralPalette: createPalette(options.neutral, core.n1),
        neutralVariantPalette: createPalette(options.neutralVariant, core.n2),
    })
}

function createPalette(color: Color | undefined, fallback: TonalPalette) {
    if (!color) return fallback
    return createTonalPalette(color)
}

function isSchemeBasedOnSeedColor(options: SchemeOptions): boolean {
    const hasColorSource = !!options.seedColor || !!options.primary
    return (
        hasColorSource &&
        !Object.values({
            secondary: options.secondary,
            tertiary: options.tertiary,
            neutral: options.neutral,
            neutralVariant: options.neutralVariant,
        }).some(Boolean)
    )
}
