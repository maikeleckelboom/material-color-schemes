import { describe, expect, it } from 'vitest';
import {
  type Color,
  COLOR_SCHEME_KEYS,
  createColorScheme,
  createScheme,
  createTheme,
  type CustomColor,
} from '../src';
import { argbFromHex } from '@material/material-color-utilities';

const seedColor: Color = '#CD3232';
const customColors: CustomColor[] = [
  {
    name: 'Electric Leaf',
    value: '#32CD32',
  },
  {
    name: 'Blueberry Blue',
    value: '#4F66B0',
  },
];

describe('Color Scheme Generation', () => {
  describe('Core Functionality', () => {
    it('generates a complete scheme with all M3 color keys', () => {
      const theme = createTheme(seedColor);
      const colorScheme = createColorScheme(theme, { brightnessVariants: true });

      COLOR_SCHEME_KEYS.forEach((key) => {
        expect(colorScheme).toHaveProperty(key);
      });
    });

    it('automatically generates light/dark variants when brightnessVariants is enabled', () => {
      const theme = createTheme(seedColor);
      const colorScheme = createColorScheme(theme, { brightnessVariants: true });

      COLOR_SCHEME_KEYS.forEach((key) => {
        expect(colorScheme).toHaveProperty(`${key}Light`);
        expect(colorScheme).toHaveProperty(`${key}Dark`);
      });
    });

    it('allows runtime customization through modifyColorScheme callback', () => {
      const scheme = createScheme(seedColor);
      const colorScheme = createColorScheme(scheme, {
        modifyColorScheme: (colorScheme) => ({
          ...colorScheme,
          scrim: colorScheme.surfaceContainer,
          customAccent: colorScheme.primary,
        }),
      });

      expect(colorScheme.scrim).toBe(colorScheme.surfaceContainer);
      expect(colorScheme).toHaveProperty('customAccent');
    });
  });

  describe('Special Features', () => {
    it('applies AMOLED filter by replacing surface colors with pure black', () => {
      const scheme = createScheme(seedColor);
      const colorScheme = createColorScheme(scheme, {
        modifyColorScheme: (colorScheme) => ({
          ...colorScheme,
          background: argbFromHex('#000000'),
          surface: argbFromHex('#000000'),
        }),
      });

      expect(colorScheme.background).toBe(4278190080);
    });
  });

  describe('Custom Color Handling', () => {
    it('includes custom colors in the scheme with default naming', () => {
      const theme = createTheme(seedColor, { customColors });
      const colorScheme = createColorScheme(theme);

      expect(colorScheme).toHaveProperty('electricLeaf');
      expect(colorScheme).toHaveProperty('blueberryBlue');
    });

    it('generates brightness variants for custom colors when enabled', () => {
      const theme = createTheme(seedColor, { customColors });
      const colorScheme = createColorScheme(theme, { brightnessVariants: true });

      expect(colorScheme).toHaveProperty('electricLeafLight');
      expect(colorScheme).toHaveProperty('blueberryBlueDark');
    });

    it('excludes brightness variants for custom colors when disabled', () => {
      const theme = createTheme(seedColor, { customColors });
      const colorScheme = createColorScheme(theme, { brightnessVariants: false });

      expect(colorScheme).toHaveProperty('electricLeaf');
      expect(colorScheme).not.toHaveProperty('electricLeafLight');
      expect(colorScheme).not.toHaveProperty('blueberryBlueDark');
    });
  });
});
