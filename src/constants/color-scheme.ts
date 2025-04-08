/**
 * Defines all valid color scheme keys for Material Design 3 (M3) color systems.
 *
 * @constant {ReadonlyArray<string>} COLOR_SCHEME_KEYS
 * @see {@link https://m3.material.io/styles/color/overview Material Design 3 Color System}
 * @example
 * // Access all M3 color scheme keys
 * COLOR_SCHEME_KEYS.forEach(colorKey => {
 *   console.log('Supported color:', colorKey);
 * });
 *
 * @description
 * Contains the complete set of color role identifiers specified by Material Design 3.
 * These keys represent the fundamental building blocks for creating theme-aware interfaces,
 * ensuring consistent color relationships across light/dark modes and component states.
 *
 * The array is frozen to prevent modification, maintaining design system integrity.
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
