import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import {
  COLOR_SCHEME_KEYS,
  ContrastLevel,
  convertToArgb,
  createColorScheme,
  createTheme,
  type Theme,
  type ThemeOptions,
  Variant,
} from '../src';

export const LEMON_CORE_PALETTE_COLORS = {
  primary: convertToArgb('#FFDE3F'),
  secondary: convertToArgb('#9B9168'),
  tertiary: convertToArgb('#6D9B7B'),
  error: convertToArgb('#FF5449'),
  neutral: convertToArgb('#949088'),
  neutralVariant: convertToArgb('#969080'),
} as const;

export const CORAL_CORE_PALETTE_COLORS = {
  primary: convertToArgb('#FF6F61'),
  secondary: convertToArgb('#2F9595'),
  tertiary: convertToArgb('#FFB347'),
  error: convertToArgb('#FF5449'),
  neutral: convertToArgb('#A59D94'),
  neutralVariant: convertToArgb('#B2A996'),
} as const;

export const LAVENDER_CORE_PALETTE_COLORS = {
  primary: convertToArgb('#9A86A8'),
  secondary: convertToArgb('#7A918D'),
  tertiary: convertToArgb('#C9918E'),
  error: convertToArgb('#FF5449'),
  neutral: convertToArgb('#8C8C8F'),
  neutralVariant: convertToArgb('#9397A3'),
} as const;

export const SKY_CORE_PALETTE_COLORS = {
  primary: convertToArgb('#769CDF'),
  secondary: convertToArgb('#8991A2'),
  tertiary: convertToArgb('#A288A6'),
  error: convertToArgb('#FF5449'),
  neutral: convertToArgb('#919093'),
  neutralVariant: convertToArgb('#8E9098'),
} as const;

const themeOptions: ThemeOptions = {
  sourceColor: 0xFF769CDF,   // #769CDF
  primary: 0xFF769CDF,   // #769CDF
  secondary: 0xFF8991A2, // #8991A2
  tertiary: 0xFFA288A6,  // #A288A6
  neutral: 0xFF919093,   // #919093
  neutralVariant: 0xFF8E9098, // #8E9098
  contrastLevel: ContrastLevel.DEFAULT,
  variant: Variant.TONAL_SPOT,
  staticColors: [
    {
      name: 'Electric Leaf',
      value: 0xFF32CD32, // #32CD32
    },
    {
      name: 'Blueberry Blue',
      value: 0xFF4F66B0, // #4F66B0
    },
  ],
};

let theme: Theme;

beforeEach(() => {
  theme = createTheme(themeOptions);
});

describe('createColorScheme', () => {
  describe('Core Functionality', () => {
    it('generates a complete scheme with all M3 color keys', () => {
      const colorScheme = createColorScheme(theme, { brightnessVariants: true });

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
});
