import { describe, expect, it } from 'vitest';
import { TonalPalette } from '@material/material-color-utilities';
import { createPalette, DEFAULT_PALETTE_TONES, mapPaletteTones } from '../src';

describe('Tonal Palette Creation', () => {
  describe('createPalette', () => {
    const hexPalette = createPalette('#40A127');
    const argbPalette = createPalette(0xFF40A127);

    it('creates a TonalPalette from valid color inputs (hex/ARGB)', () => {
      expect(hexPalette).toBeInstanceOf(TonalPalette);
      expect(argbPalette).toBeInstanceOf(TonalPalette);
    });


    it('produces equivalent palettes for hex and ARGB inputs', () => {
      expect(hexPalette.tone(40)).toEqual(argbPalette.tone(40));
    })
  });

  describe('mapPaletteTones', () => {
    const testColor = '#40A127';
    const testTones = [0, 50, 100];

    it('generates tone maps for default and custom tones with order preservation', () => {
      // Default tones
      const defaultMap = mapPaletteTones(testColor, [...DEFAULT_PALETTE_TONES]);
      expect(Object.keys(defaultMap)).toEqual(DEFAULT_PALETTE_TONES.map(String));

      // Custom tones with edge cases
      const customMap = mapPaletteTones(testColor, testTones);
      expect(Object.keys(customMap)).toEqual(testTones.map(String));
    });

    it('uses palette.tone() for each specified tone', () => {
      const palette = createPalette(testColor);
      const tones = [20, 40, 60];
      const toneMap = mapPaletteTones(palette, tones);

      tones.forEach(tone => {
        expect(toneMap[tone]).toBe(palette.tone(tone));
      });
    });

    it('handles both color formats consistently', () => {
      const hexMap = mapPaletteTones('#40A127');
      const argbMap = mapPaletteTones(0xFF40A127);

      expect(hexMap).toEqual(argbMap);
    });

    it('does not mutate input tones array', () => {
      const originalTones = [10, 20];
      const copiedTones = [...originalTones];
      mapPaletteTones(testColor, originalTones);

      expect(originalTones).toEqual(copiedTones);
    });

    it('matches default tones snapshot', () => {
      expect(mapPaletteTones(testColor)).toMatchSnapshot();
    });
  });
});