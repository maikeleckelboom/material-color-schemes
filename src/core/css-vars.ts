import kebabCase from 'kebab-case'
import {convertToHex} from './conversion'
import type {Color} from "../types/color.ts";

export type CssVarName<T extends string> = `--${Lowercase<T>}`

export function formatCssVarName<T extends string>(key: T): CssVarName<T> {
    return `--${kebabCase(key)}` as CssVarName<T>
}

export function colorSchemeToCssVars<T extends Record<string, Color>>(
    colorScheme: T,
    cssSelector?: string,
): string {
    const cssVars = Object.entries(colorScheme)
        .map(([key, value]) => `${formatCssVarName(key)}: ${convertToHex(value)};`)
        .join(' ')
    return cssSelector ? `${cssSelector} { ${cssVars} }` : cssVars
}