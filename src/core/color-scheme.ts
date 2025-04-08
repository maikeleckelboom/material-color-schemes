import camelCase from 'camelcase'
import camelcase from 'camelcase'
import {type CustomColorGroup, type DynamicScheme} from "@material/material-color-utilities";
import type {Theme} from "../types";
import {COLOR_SCHEME_KEYS, type ColorSchemeOptions} from "../types/color.ts";

/**
 * Format color name using template pattern
 *
 * @param pattern The example template pattern to format the color name to
 * @param name The default name to use in the template
 * @param suffix The suffix to append to the formatted name
 * @returns The formatted color name
 */
export function formatColorName(pattern: string, name: string, suffix?: string) {
    return camelCase(
        `${pattern
            .replace(/([A-Z])/g, `_$1`)
            .toLowerCase()
            .replace(/color/g, camelCase(name))}${suffix ? `_${suffix}` : ''}`,
    )
}

export function getColorsFromScheme(scheme: DynamicScheme, suffix?: string) {
    const colors: Record<string, number> = {}
    COLOR_SCHEME_KEYS.forEach(key => {
        colors[camelcase(key + (suffix ? `_${suffix}` : ''))] = scheme[key]
    })
    return colors
}

export function getColorsFromTheme(theme: Theme, options: ColorSchemeOptions = {}) {
    const {brightnessVariants = true, dark = false} = options
    const scheme = dark ? theme.schemes.dark : theme.schemes.light;

    const colors = getColorsFromScheme(scheme);

    if (brightnessVariants) {
        const lightColors = getColorsFromScheme(theme.schemes.light, 'light')
        const darkColors = getColorsFromScheme(theme.schemes.dark, 'dark')
        Object.assign(colors, lightColors, darkColors)
    }

    const customColorTokens = Object.assign(
        {},
        ...theme.customColors.map(customColor => getColorsFromCustomColor(customColor, options))
    );

    return {
        ...colors,
        ...customColorTokens
    }
}

export function getColorsFromCustomColor(colorGroup: CustomColorGroup, options: ColorSchemeOptions = {}) {
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
