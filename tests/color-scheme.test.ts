import {describe, expect, it} from "vitest"
import {
    type Color,
    COLOR_SCHEME_KEYS,
    createColorScheme,
    createScheme,
    createTheme,
    type CustomColor,
    getContrastColor
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

    it('should generate color scheme from scheme', () => {
        const scheme = createScheme(seedColor)
        const colorScheme = createColorScheme(scheme, {
            modifyColorScheme(colorScheme) {
                colorScheme.onSurfaceContainer = getContrastColor(colorScheme.surfaceContainer)
                colorScheme.scrim = colorScheme.surfaceContainer
                return colorScheme
            }
        })
        expect(colorScheme).toHaveProperty('onSurfaceContainer')
        expect(colorScheme.scrim).toBe(colorScheme.surfaceContainer)
    })

    it('should generate color scheme with custom colors', () => {
        const theme = createTheme(seedColor, {customColors})
        const colorScheme = createColorScheme(theme)
        expect(colorScheme).toHaveProperty('electricLeaf')
        expect(colorScheme).toHaveProperty('blueberryBlue')
    })


})