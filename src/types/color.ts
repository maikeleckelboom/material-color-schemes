export type Color = string | number

export interface CustomColor {
    name: string
    value: Color
    blend?: boolean
}

export interface DynamicColors {
    primaryPaletteKeyColor: number
    secondaryPaletteKeyColor: number
    tertiaryPaletteKeyColor: number
    neutralPaletteKeyColor: number
    neutralVariantPaletteKeyColor: number
    background: number
    onBackground: number
    surface: number
    surfaceDim: number
    surfaceBright: number
    surfaceContainerLowest: number
    surfaceContainerLow: number
    surfaceContainer: number
    surfaceContainerHigh: number
    surfaceContainerHighest: number
    onSurface: number
    surfaceVariant: number
    onSurfaceVariant: number
    inverseSurface: number
    inverseOnSurface: number
    outline: number
    outlineVariant: number
    shadow: number
    scrim: number
    surfaceTint: number
    primary: number
    onPrimary: number
    primaryContainer: number
    onPrimaryContainer: number
    inversePrimary: number
    secondary: number
    onSecondary: number
    secondaryContainer: number
    onSecondaryContainer: number
    tertiary: number
    onTertiary: number
    tertiaryContainer: number
    onTertiaryContainer: number
    error: number
    onError: number
    errorContainer: number
    onErrorContainer: number
    primaryFixed: number
    primaryFixedDim: number
    onPrimaryFixed: number
    onPrimaryFixedVariant: number
    secondaryFixed: number
    secondaryFixedDim: number
    onSecondaryFixed: number
    onSecondaryFixedVariant: number
    tertiaryFixed: number
    tertiaryFixedDim: number
    onTertiaryFixed: number
    onTertiaryFixedVariant: number
}
