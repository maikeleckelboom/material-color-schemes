import {describe, expect, it} from "vitest"
import {
    applyAmoledFilter,
    type Color,
    COLOR_SCHEME_KEYS,
    createColorScheme,
    createScheme,
    createTheme,
    type CustomColor
} from "../src";

const seedColor: Color = '#CD3232'
const customColors: CustomColor[] = [
    {
        name: 'Electric Leaf',
        value: '#32CD32',
    },
    {
        name: 'Blueberry Blue',
        value: '#4F66B0',
    },
]

describe('colorScheme', () => {
    it('should return a color scheme object', () => {
        const theme = createTheme(seedColor)
        const colorScheme = createColorScheme(theme, {brightnessVariants: true})
        expect(colorScheme).toBeDefined()

        COLOR_SCHEME_KEYS.forEach((key) => {
            expect(colorScheme).toHaveProperty(key)
        })
    })

    it('should contain all color scheme keys with light/dark variants', () => {
        const theme = createTheme(seedColor)
        const colorScheme = createColorScheme(theme, {brightnessVariants: true})

        COLOR_SCHEME_KEYS.forEach((key) => {
            expect(colorScheme).toHaveProperty(key)
            expect(colorScheme).toHaveProperty(`${key}Light`)
            expect(colorScheme).toHaveProperty(`${key}Dark`)
        })
    })

    it('should allow modification of any color value', () => {
        const scheme = createScheme(seedColor)
        const colorScheme = createColorScheme(scheme, {
            modifyColorScheme: (colorScheme) => ({
                ...colorScheme,
                /**
                 * Override a color in the color scheme
                 */
                scrim: colorScheme.surfaceContainer,
                /**
                 * Add a color that is not in the color scheme
                 */
                accent: colorScheme.primary,
            })
        })
        expect(colorScheme.scrim).toBe(colorScheme.surfaceContainer)
    })

    it('should apply amoled filter', () => {
        const scheme = createScheme(seedColor)
        const colorScheme = createColorScheme(scheme, {modifyColorScheme: applyAmoledFilter})
        expect(colorScheme.background).toBe(4278190080)
    })

    it('should generate color scheme with custom colors', () => {
        const theme = createTheme(seedColor, {customColors})
        const colorScheme = createColorScheme(theme)
        expect(colorScheme).toHaveProperty('electricLeaf')
        expect(colorScheme).toHaveProperty('blueberryBlue')
    })

    it('should generate color scheme with custom colors and brightness variants', () => {
        const theme = createTheme(seedColor, {customColors})
        const colorScheme = createColorScheme(theme, {brightnessVariants: true})
        expect(colorScheme).toHaveProperty('electricLeafLight')
        expect(colorScheme).toHaveProperty('blueberryBlueDark')
    })

    it('should generate color scheme with custom colors and no brightness variants', () => {
        const theme = createTheme(seedColor, {customColors})
        const colorScheme = createColorScheme(theme, {brightnessVariants: false})
        expect(colorScheme).toHaveProperty('electricLeaf')
        expect(colorScheme).not.toHaveProperty('electricLeafLight')
        expect(colorScheme).not.toHaveProperty('blueberryBlueDark')
    })

})