import {type CustomColorGroup, DynamicScheme, TonalPalette} from "@material/material-color-utilities";
import {Variant} from "../core/config";
import type {CustomColor} from "./color.ts";
import type {SchemeOptions} from "./scheme.ts";

export type MaterialThemeOptions = Omit<SchemeOptions, 'isDark'> & {
    customColors?: CustomColor[]
}

export interface MaterialTheme {
    source: number
    contrastLevel: number
    variant: Variant
    schemes: {
        light: DynamicScheme
        dark: DynamicScheme
    }
    palettes: {
        primary: TonalPalette
        secondary: TonalPalette
        tertiary: TonalPalette
        neutral: TonalPalette
        neutralVariant: TonalPalette
        error: TonalPalette
    }
    customColors: CustomColorGroup[]
}
