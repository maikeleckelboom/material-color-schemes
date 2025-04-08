export type Color = string | number

export interface CustomColor {
    name: string
    value: Color
    blend?: boolean
}

/**
 * Represents a complete color scheme following Material Design 3 specifications
 * @see https://m3.material.io/styles/color/overview
 */
export const COLOR_SCHEME_KEYS = [
    'primaryPaletteKeyColor',
    'secondaryPaletteKeyColor',
    'tertiaryPaletteKeyColor',
    'neutralPaletteKeyColor',
    'neutralVariantPaletteKeyColor',
    'background',
    'onBackground',
    'surface',
    'surfaceDim',
    'surfaceBright',
    'surfaceContainerLowest',
    'surfaceContainerLow',
    'surfaceContainer',
    'surfaceContainerHigh',
    'surfaceContainerHighest',
    'onSurface',
    'surfaceVariant',
    'onSurfaceVariant',
    'inverseSurface',
    'inverseOnSurface',
    'outline',
    'outlineVariant',
    'shadow',
    'scrim',
    'surfaceTint',
    'primary',
    'onPrimary',
    'primaryContainer',
    'onPrimaryContainer',
    'inversePrimary',
    'secondary',
    'onSecondary',
    'secondaryContainer',
    'onSecondaryContainer',
    'tertiary',
    'onTertiary',
    'tertiaryContainer',
    'onTertiaryContainer',
    'error',
    'onError',
    'errorContainer',
    'onErrorContainer',
    'primaryFixed',
    'primaryFixedDim',
    'onPrimaryFixed',
    'onPrimaryFixedVariant',
    'secondaryFixed',
    'secondaryFixedDim',
    'onSecondaryFixed',
    'onSecondaryFixedVariant',
    'tertiaryFixed',
    'tertiaryFixedDim',
    'onTertiaryFixed',
    'onTertiaryFixedVariant',
] as const;

export type ColorKey = typeof COLOR_SCHEME_KEYS[number] | (string & {});

export interface ColorScheme extends Record<ColorKey, number> {
}

type SuffixedColorScheme<Suffix extends string> = {
    [K in ColorKey as `${K}${Suffix}`]: number;
};

export type LightColorScheme = SuffixedColorScheme<'Light'>;

export type DarkColorScheme = SuffixedColorScheme<'Dark'>;

export interface ColorSchemeOptions {
    dark?: boolean
    brightnessVariants?: boolean
}
