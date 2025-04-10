import { TonalPalette } from '@material/material-color-utilities';
import { toArgb, toHct } from './conversion.ts';
import { DEFAULT_PALETTE_TONES } from '../constants';
import type { Color } from '../types';

/**
 * Creates a TonalPalette, which is a convenience class for retrieving colors
 * that are constant in hue and chroma, but vary in tone.
 * @param color - The base color.
 * @returns A TonalPalette instance.
 */
export function createPalette(color: Color): TonalPalette {
  return TonalPalette.fromInt(toArgb(color));
}

/**
 * Extracts color values for specified tones from a TonalPalette.
 * @param palette - A TonalPalette instance.
 * @param tones - An array of tone values.
 * @returns An object mapping tone values to color values.
 */
export function getPaletteColors(
  palette: TonalPalette,
  tones: number[] = [...DEFAULT_PALETTE_TONES],
): Record<number, number> {
  return Object.fromEntries(tones.map((tone) => [tone, palette.tone(tone)]));
}

/**
 * Checks if a color is part of a given palette.
 * @param palette - A TonalPalette instance.
 * @param color - A Color value.
 * @returns True if the color is in the palette, false otherwise.
 */
export function isColorInPalette(palette: TonalPalette, color: Color): boolean {
  const hct = toHct(color);
  return hct.hue === palette.hue && hct.chroma === palette.chroma;
}

/**
 * Creates a complementary palette based on the provided TonalPalette.
 * @param palette - A TonalPalette instance.
 * @returns A new TonalPalette instance with complementary colors.
 */
export function createComplementaryPalette(palette: TonalPalette): TonalPalette {
  const newHue = (palette.hue + 180) % 360;
  return TonalPalette.fromHueAndChroma(newHue, palette.chroma);
}

/**
 * Creates analogous palettes based on the provided TonalPalette.
 * @param palette - A TonalPalette instance.
 * @param offset - The hue offset for creating analogous colors.
 * @returns An array of TonalPalette instances with analogous colors.
 */
export function createAnalogousPalettes(
  palette: TonalPalette,
  offset = 30,
): TonalPalette[] {
  return [offset, -offset].map((offset) =>
    TonalPalette.fromHueAndChroma((palette.hue + offset + 360) % 360, palette.chroma),
  );
}
