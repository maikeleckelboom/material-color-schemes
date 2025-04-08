import type {Color, DynamicColors} from "./color.ts";
import type {Variant} from "../core/config";

export interface DefaultSchemeOptions {
    primary?: Color
    secondary?: Color
    tertiary?: Color
    neutral?: Color
    neutralVariant?: Color
    contrastLevel?: number
    variant?: Variant
    isDark?: boolean
}

export type SchemeOptions =
    | (DefaultSchemeOptions & { primary: Color; seedColor?: Color })
    | (DefaultSchemeOptions & { seedColor: Color; primary?: Color })

export interface ToColorSchemeOptions {
    modifyColorScheme?: (colorScheme: DynamicColors) => DynamicColors
}