import type {MaterialTheme, MaterialThemeOptions} from "../types";
import type {Color} from "../types/color.ts";
import {ContrastLevel, Variant} from "./config";
import {createDynamicScheme} from "./scheme.ts";
import {createCustomColor} from "./color.ts";
import {TonalPalette} from "@material/material-color-utilities";
import {convertToArgb} from "./conversion.ts";


/**
 * Creates a Material Design theme from a seed color or theme options.
 * Generates both light and dark scheme variants, color palettes, and handles custom colors.
 *
 * @example
 * // Using seed color with options
 * createMaterialTheme(0xff0000, { contrastLevel: ContrastLevel.HIGH });
 *
 * @example
 * // Using full options object
 * createMaterialTheme({
 *   seedColor: 0x00ff00,
 *   variant: Variant.EXPRESSIVE,
 *   customColors: [/* ... *\/]
 * });
 *
 * @returns {MaterialTheme} Complete theme object with light/dark schemes and palettes
 * @param seedColor
 * @param options
 */
export function createMaterialTheme(
    seedColor: Color,
    options?: Omit<MaterialThemeOptions, 'seedColor'>
): MaterialTheme;
export function createMaterialTheme(options: MaterialThemeOptions): MaterialTheme;
export function createMaterialTheme(
    colorOrOptions: Color | MaterialThemeOptions,
    maybeOptions?: Omit<MaterialThemeOptions, 'seedColor'>,
): MaterialTheme {
    const options: MaterialThemeOptions =
        typeof colorOrOptions === 'number' || typeof colorOrOptions === 'string'
            ? {...maybeOptions, seedColor: colorOrOptions}
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
    } = options

    const seedColor = convertToArgb(options.seedColor || options.primary || 0)

    const newScheme = (isDark: boolean) =>
        createDynamicScheme({
            seedColor,
            isDark,
            primary,
            secondary,
            tertiary,
            neutral,
            neutralVariant,
            contrastLevel,
            variant,
        })

    const lightScheme = newScheme(false)
    const darkScheme = newScheme(true)

    const core = {
        a1: lightScheme.primaryPalette,
        a2: lightScheme.secondaryPalette,
        a3: lightScheme.tertiaryPalette,
        n1: lightScheme.neutralPalette,
        n2: lightScheme.neutralVariantPalette,
        error: lightScheme.errorPalette,
    }

    return {
        source: seedColor,
        contrastLevel,
        variant,
        schemes: {
            light: lightScheme,
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
    }
}
