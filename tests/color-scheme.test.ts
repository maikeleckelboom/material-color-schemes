import {describe, expect, it} from "vitest"
import {createTheme} from "../src/core/theme.ts";
import {createColorScheme} from "../src/core/color-scheme.ts";
import {COLOR_SCHEME_KEYS} from "../src/types/color-scheme.ts";
import {createScheme} from "../src/core/scheme.ts";

describe('colorScheme', () => {
    it('should return a color scheme object', () => {
        const customColors = [
            {
                name: 'Electric Leaf',
                value: '#32CD32',
            },
            {
                name: 'Blueberry Blue',
                value: '#4F66B0',
            },
        ]
        const theme = createTheme('#CD3232', {customColors})
        expect(theme).toBeDefined()

        const colorScheme = createColorScheme(theme, {
            brightnessVariants: true
        })

        expect(colorScheme).toHaveProperty('electricLeaf')
        expect(colorScheme).toHaveProperty('blueberryBlue')

    })


    it('should contain all color scheme keys with light/dark variants', () => {
        const theme = createTheme('#CD3232')
        const colorScheme = createColorScheme(theme, {
            brightnessVariants: true,
            modifyColorScheme: (colorScheme) => {
                return colorScheme
            }
        })

        COLOR_SCHEME_KEYS.forEach((key) => {
            expect(colorScheme).toHaveProperty(key)
            expect(colorScheme).toHaveProperty(`${key}Light`)
            expect(colorScheme).toHaveProperty(`${key}Dark`)
        })
    })

    it('should generate color scheme from scheme', () => {
        const scheme = createScheme('#CD3232')
        const colorScheme = createColorScheme(scheme)
        console.log(colorScheme)
        expect(colorScheme).toHaveProperty('primary')


    })

})