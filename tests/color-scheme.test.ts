import {describe, expect, it} from "vitest"
import {createTheme} from "../src/core/theme.ts";
import {getColorsFromCustomColor, getColorsFromTheme} from "../src/core/color-scheme.ts";

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
        const themeCustomColors = theme.customColors.map((customColor) => getColorsFromCustomColor(customColor))
        const coreColors = getColorsFromTheme(theme)
        expect(theme).toBeDefined()
        expect(themeCustomColors).toBeDefined()
    })
})