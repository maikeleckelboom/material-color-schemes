import { beforeAll, describe, expect, it } from 'vitest';
import {
  COLOR_SCHEME_KEYS,
  ContrastLevel,
  createColorScheme,
  createTheme,
  type Theme,
  type ThemeOptions,
  Variant,
} from '../src';

const themeOptions: ThemeOptions = {
  sourceColor: 0xff769cdf,
  primary: 0xff769cdf,
  secondary: 0xff8991a2,
  tertiary: 0xffa288a6,
  neutral: 0xff919093,
  neutralVariant: 0xff8e9098,
  contrastLevel: ContrastLevel.DEFAULT,
  variant: Variant.TONAL_SPOT,
  staticColors: [
    {
      name: 'Electric Leaf',
      value: 0xff32cd32,
    },
    {
      name: 'Blueberry Blue',
      value: 0xff4f66b0,
    },
  ],
};

let theme: Theme;

beforeAll(() => {
  theme = createTheme(themeOptions);
});

describe('createColorScheme', () => {
  describe('Core Functionality', () => {
    it('generates a complete scheme with all M3 color keys', () => {
      const colorScheme = createColorScheme(theme);

      COLOR_SCHEME_KEYS.forEach((key) => {
        expect(colorScheme).toHaveProperty(key);
      });
    });

    it('automatically generates light/dark variants when brightnessVariants is enabled', () => {
      const colorScheme = createColorScheme(theme, { brightnessVariants: true });

      COLOR_SCHEME_KEYS.forEach((key) => {
        expect(colorScheme).toHaveProperty(`${key}Light`);
        expect(colorScheme).toHaveProperty(`${key}Dark`);
      });
    });

    it('allows runtime customization through modifyColorScheme callback', () => {
      const colorScheme = createColorScheme(theme, {
        modifyColorScheme: (colorScheme) => ({
          ...colorScheme,
          scrim: colorScheme.surfaceContainer,
          accent: colorScheme.primary,
        }),
      });

      expect(colorScheme.scrim).toBe(colorScheme.surfaceContainer);
      expect(colorScheme.accent).toBe(colorScheme.primary);
    });
  });

  describe('Special Features', () => {
    it('applies AMOLED filter by replacing surface colors with pure black', () => {
      const colorScheme = createColorScheme(theme, {
        modifyColorScheme: (colorScheme) => ({
          ...colorScheme,
          background: 4278190080,
          surface: 4278190080,
        }),
      });

      expect(colorScheme.background).toBe(4278190080);
      expect(colorScheme.surface).toBe(4278190080);
    });
  });

  describe('Custom Color Handling', () => {
    it('includes custom colors in the scheme with default naming', () => {
      const colorScheme = createColorScheme(theme);

      expect(colorScheme).toHaveProperty('electricLeaf');
      expect(colorScheme).toHaveProperty('blueberryBlue');
    });

    it('generates brightness variants for custom colors when enabled', () => {
      const colorScheme = createColorScheme(theme, { brightnessVariants: true });

      expect(colorScheme).toHaveProperty('electricLeafLight');
      expect(colorScheme).toHaveProperty('blueberryBlueDark');
    });

    it('excludes brightness variants for custom colors when disabled', () => {
      const colorScheme = createColorScheme(theme, { brightnessVariants: false });

      expect(colorScheme).toHaveProperty('electricLeaf');
      expect(colorScheme).not.toHaveProperty('electricLeafLight');
      expect(colorScheme).not.toHaveProperty('blueberryBlueDark');
    });
  });

  describe('Palette Tones', () => {
    it('should generate palettes for primary, secondary, and tertiary colors', () => {
      const paletteTones = [0, 25, 50, 75, 100];
      const colorScheme = createColorScheme(theme, { paletteTones });
      for (const tone of paletteTones) {
        expect(colorScheme).toHaveProperty(`primary${tone}`);
        expect(colorScheme).toHaveProperty(`secondary${tone}`);
        expect(colorScheme).toHaveProperty(`tertiary${tone}`);
        expect(colorScheme).toHaveProperty(`neutral${tone}`);
        expect(colorScheme).toHaveProperty(`neutralVariant${tone}`);
      }
    });
  });
});
