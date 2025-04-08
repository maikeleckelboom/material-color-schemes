import camelcase from 'camelcase'
import {type CustomColorGroup, DynamicScheme} from "@material/material-color-utilities";
import type {Theme} from "../types";
import {COLOR_SCHEME_KEYS, type ColorSchemeOptions, type ColorSchemeReturnType} from "../types/color-scheme.ts";
import {formatColorName} from "./format.ts";


export function getColorsFromScheme(scheme: DynamicScheme, suffix?: string) {
    const colors: Record<string, number> = {}
    COLOR_SCHEME_KEYS.forEach(key => {
        colors[camelcase(key + (suffix ? `_${suffix}` : ''))] = scheme[key]
    })
    return colors
}

export function getColorsFromCustomColor<V extends boolean>(colorGroup: CustomColorGroup, options: ColorSchemeOptions<V> = {}) {
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

function isInputScheme(theme: Theme | DynamicScheme): theme is DynamicScheme {
    return theme instanceof DynamicScheme
}

export function createColorScheme<V extends boolean = false>(
    theme: Theme | DynamicScheme,
    options?: ColorSchemeOptions<V>
): ColorSchemeReturnType<V> {
    const {dark = false, brightnessVariants = false} = options || {}

    if (isInputScheme(theme)) {
        const colors = getColorsFromScheme(theme)
        if (brightnessVariants) {
            const lightColors = getColorsFromScheme(theme, 'light')
            const darkColors = getColorsFromScheme(theme, 'dark')
            Object.assign(colors, lightColors, darkColors)
        }
        return colors as ColorSchemeReturnType<V>
    }

    const scheme = isInputScheme(theme) ? theme : dark ? theme.schemes.dark : theme.schemes.light

    const colors = getColorsFromScheme(scheme)
    const customColors = getCustomColorsFromTheme(theme, options);

    const colorScheme = {
        ...colors,
        ...customColors
    }

    if (brightnessVariants) {
        const lightColors = getColorsFromScheme(theme.schemes.light, 'light')
        const darkColors = getColorsFromScheme(theme.schemes.dark, 'dark')
        Object.assign(colorScheme, lightColors, darkColors)
    }

    const result = options?.modifyColorScheme?.(colorScheme) ?? colorScheme;
    return result as ColorSchemeReturnType<V>;
}