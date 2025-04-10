import { TonalPalette } from '@material/material-color-utilities';
import { convertToArgb } from './conversion.ts';
import { DEFAULT_PALETTE_TONES } from '../constants';
import type { Color } from '../types';

/**
 * Creates a TonalPalette from a given color.
 * @param color - The base color.
 * @returns A TonalPalette instance.
 */
export function createTonalPalette(color: Color): TonalPalette {
  return TonalPalette.fromInt(convertToArgb(color));
}

/**
 * Creates a mapping of tone values to their corresponding color values.
 * @param colorOrPalette - A Color or TonalPalette instance.
 * @param paletteTones - An array of tone values.
 * @returns An object mapping tone values to color values.
 */
export function mapPaletteTones(
  colorOrPalette: Color | TonalPalette,
  paletteTones: number[] = [...DEFAULT_PALETTE_TONES],
): Record<number, number> {
  if (!(colorOrPalette instanceof TonalPalette)) {
    colorOrPalette = createTonalPalette(colorOrPalette);
  }
  return extractPaletteColors(colorOrPalette, paletteTones);
}

/**
 * Extracts color values for specified tones from a TonalPalette.
 * @param palette - A TonalPalette instance.
 * @param tones - An array of tone values.
 * @returns An object mapping tone values to color values.
 */
export function extractPaletteColors(
  palette: TonalPalette,
  tones: number[],
): Record<number, number> {
  tones.sort((a, b) => a - b);
  return Object.fromEntries(tones.map((tone) => [tone, palette.tone(tone)]));
}
