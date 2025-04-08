import camelcase from 'camelcase'
import {type CustomColorGroup, DynamicScheme} from "@material/material-color-utilities";
import type {ColorScheme, ColorSchemeOptions, ColorSchemeReturnType, Theme} from "../types";
import {COLOR_SCHEME_KEYS} from "../constants";
import {formatColorName} from "./format.ts";

/**
 * Generates a color scheme from a Theme or DynamicScheme object, with support for dark mode,
 * brightness variants, and custom color modifications.
 *
 * @template V - Boolean type indicating whether brightness variants are included (extends boolean, defaults to false)
 * @param {Theme | DynamicScheme} themeOrScheme - The theme or color scheme to generate colors from
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
    themeOrScheme: Theme | DynamicScheme,
    options?: ColorSchemeOptions<V>
): ColorSchemeReturnType<V> {
    const {dark = false, brightnessVariants = false} = options || {}

    if (isInputScheme(themeOrScheme)) {
        const colorScheme = getColorsFromScheme(themeOrScheme)
        if (brightnessVariants) {
            const lightColors = getColorsFromScheme(themeOrScheme, 'light')
            const darkColors = getColorsFromScheme(themeOrScheme, 'dark')
            Object.assign(colorScheme, lightColors, darkColors)
        }
        const result = options?.modifyColorScheme?.(colorScheme as ColorScheme) ?? colorScheme;
        return result as ColorSchemeReturnType<V>;
    }

    const scheme = isInputScheme(themeOrScheme) ? themeOrScheme : dark ? themeOrScheme.schemes.dark : themeOrScheme.schemes.light

    const colors = getColorsFromScheme(scheme)
    const customColors = getCustomColorsFromTheme(themeOrScheme, options);

    const colorScheme = {
        ...colors,
        ...customColors
    }

    if (brightnessVariants) {
        const lightColors = getColorsFromScheme(themeOrScheme.schemes.light, 'light')
        const darkColors = getColorsFromScheme(themeOrScheme.schemes.dark, 'dark')
        Object.assign(colorScheme, lightColors, darkColors)
    }

    const result = options?.modifyColorScheme?.(colorScheme as ColorScheme) ?? colorScheme;
    return result as ColorSchemeReturnType<V>;
}


function isInputScheme(theme: Theme | DynamicScheme): theme is DynamicScheme {
    return theme instanceof DynamicScheme
}

function getColorsFromScheme(scheme: DynamicScheme, suffix?: string) {
    const colors: Record<string, number> = {}
    COLOR_SCHEME_KEYS.forEach(key => {
        colors[camelcase(key + (suffix ? `_${suffix}` : ''))] = scheme[key]
    })
    return colors
}

function getColorsFromCustomColor<V extends boolean>(colorGroup: CustomColorGroup, options: ColorSchemeOptions<V> = {}) {
    const {dark = false, brightnessVariants = true} = options
    const variants: { type: 'light' | 'dark'; suffix?: string }[] = []
    variants.push({type: dark ? 'dark' : 'light'})
    if (brightnessVariants) {
        variants.push(
            {type: 'light', suffix: `light`},
            {type: 'dark', suffix: `dark`}
        )
    }
    const colors: Record<string, number> = {}
    for (const {type, suffix: variantSuffix} of variants) {
        for (const [pattern, value] of Object.entries(
            colorGroup[type as 'light' | 'dark']
        )) {
            const token = formatColorName(pattern, colorGroup.color.name, variantSuffix)
            colors[token] = value
        }
    }
    return colors
}

function getCustomColorsFromTheme<V extends boolean>(theme: Theme, options?: ColorSchemeOptions<V>) {
    return Object.assign(
        {},
        ...theme.customColors.map(customColor => getColorsFromCustomColor(customColor, options))
    );
}
