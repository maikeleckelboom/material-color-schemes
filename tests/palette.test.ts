import { beforeAll, describe, expect, it } from 'vitest';
import { TonalPalette } from '@material/material-color-utilities';
import { buildPaletteTonesMapping, createPalette, DEFAULT_PALETTE_TONES } from '../src';

describe('Tonal Palette Creation', () => {
  describe('createPalette', () => {
    let hexPalette: TonalPalette;
    let argbPalette: TonalPalette;

    beforeAll(() => {
      hexPalette = createPalette('#40A127');
      argbPalette = createPalette(0xFF40A127);
    });

    it('should create TonalPalette instances from both hex and ARGB inputs', () => {
      expect(hexPalette).toBeInstanceOf(TonalPalette);
      expect(argbPalette).toBeInstanceOf(TonalPalette);
    });

    it('should produce equivalent tone values for hex and ARGB inputs', () => {
      const tone = 40;
      expect(hexPalette.tone(tone)).toEqual(argbPalette.tone(tone));
    });
  });

  describe('buildPaletteTonesMapping', () => {
    const testColor: string = '#40A127';
    const defaultTones: number[] = [...DEFAULT_PALETTE_TONES];
    const customTones: number[] = [0, 50, 100];
    let palette: TonalPalette;

    beforeAll(() => {
      palette = createPalette(testColor);
    });

    it.each([
      { tones: defaultTones, expectedKeys: DEFAULT_PALETTE_TONES.map(String), description: 'default tones' },
      { tones: customTones, expectedKeys: customTones.map(String), description: 'custom tones' },
    ])('generates tone map with preserved order for $description', ({ tones, expectedKeys }) => {
      const toneMap = buildPaletteTonesMapping(testColor, tones);
      expect(Object.keys(toneMap)).toEqual(expectedKeys);
    });

    it('should use palette.tone() for each specified tone', () => {
      const testTones: number[] = [20, 40, 60];
      const toneMap = buildPaletteTonesMapping(palette, testTones);

      testTones.forEach((tone: number) => {
        expect(toneMap[tone]).toBe(palette.tone(tone));
      });
    });

    it('should produce consistent mappings regardless of input color format', () => {
      const hexMapping = buildPaletteTonesMapping(testColor, defaultTones);
      const argbMapping = buildPaletteTonesMapping(0xFF40A127, defaultTones);
      expect(hexMapping).toEqual(argbMapping);
    });

    it('should not mutate the input tones array', () => {
      const originalTones: number[] = [10, 20];
      const tonesCopy = [...originalTones];
      buildPaletteTonesMapping(testColor, originalTones);
      expect(originalTones).toEqual(tonesCopy);
    });

    it('matches the default tone mapping snapshot', () => {
      expect(buildPaletteTonesMapping(testColor, defaultTones)).toMatchSnapshot();
    });
  });
});
