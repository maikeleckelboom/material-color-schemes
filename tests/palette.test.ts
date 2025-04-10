import { beforeAll, describe, expect, it } from 'vitest';
import { TonalPalette } from '@material/material-color-utilities';
import { createPalette, DEFAULT_PALETTE_TONES, extractPaletteColors } from '../src';

describe('Tonal Palette Creation', () => {
  describe('createPalette', () => {
    let hexPalette: TonalPalette;
    let argbPalette: TonalPalette;

    beforeAll(() => {
      hexPalette = createPalette('#40A127');
      argbPalette = createPalette(0xff40a127);
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

  describe('extractPaletteColors', () => {
    const testColor: string = '#40A127';
    const defaultTones: number[] = [...DEFAULT_PALETTE_TONES];
    const customTones: number[] = [0, 50, 100];
    let palette: TonalPalette;

    beforeAll(() => {
      palette = createPalette(testColor);
    });

    const runTestCase = (testCase: { tones: number[]; expectedKeys: string[] }) => {
      const { tones, expectedKeys } = testCase;
      const toneMap = extractPaletteColors(palette, tones);
      expect(Object.keys(toneMap)).toEqual(expectedKeys);
    };

    it.each([
      { tones: defaultTones, expectedKeys: DEFAULT_PALETTE_TONES.map(String) },
      { tones: customTones, expectedKeys: customTones.map(String) },
    ])('generates tone map with preserved order for $description', runTestCase);

    it('should use palette.tone() for each specified tone', () => {
      const testTones: number[] = [0, 20, 40, 60, 100];
      const toneMap = extractPaletteColors(palette, testTones);

      testTones.forEach((tone: number) => {
        expect(toneMap[tone]).toBe(palette.tone(tone));
      });
    });

    it('should produce consistent mappings regardless of input color format', () => {
      const hexPalette = createPalette(testColor);
      const argbPalette = createPalette(0xff40a127);
      const hexMapping = extractPaletteColors(hexPalette, defaultTones);
      const argbMapping = extractPaletteColors(argbPalette, defaultTones);
      expect(hexMapping).toEqual(argbMapping);
    });

    it('should not mutate the input tones array', () => {
      const originalTones: number[] = [10, 20];
      const tonesCopy = [...originalTones];
      const hexPalette = createPalette(testColor);
      extractPaletteColors(hexPalette, originalTones);
      expect(originalTones).toEqual(tonesCopy);
    });
  });
});
