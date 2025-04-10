import { TonalPalette } from '@material/material-color-utilities';
import { convertToArgb, convertToHct } from './conversion.ts';
import { DEFAULT_PALETTE_TONES } from '../constants';
import type { Color } from '../types';

/**
 * Creates a TonalPalette which is a convenience class for retrieving colors
 * that are constant in hue and chroma, but vary in tone.
 * @param color - The base color.
 * @returns A TonalPalette instance.
 */
export function createPalette(color: Color): TonalPalette {
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
    colorOrPalette = createPalette(colorOrPalette);
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
  return Object.fromEntries(tones.map((tone) => [tone, palette.tone(tone)]));
}

function getClosestTone(targetTone: number, paletteTones: number[] = [...DEFAULT_PALETTE_TONES]): number {
  return paletteTones.reduce((prev, curr) =>
    Math.abs(curr - targetTone) < Math.abs(prev - targetTone) ? curr : prev,
  );
}

function isColorInPalette(palette: TonalPalette, color: Color): boolean {
  const hct = convertToHct(color);
  return hct.hue === palette.hue && hct.chroma === palette.chroma;
}

function createComplementaryPalette(palette: TonalPalette): TonalPalette {
  const newHue = (palette.hue + 180) % 360;
  return TonalPalette.fromHueAndChroma(newHue, palette.chroma);
}

function createAnalogousPalettes(palette: TonalPalette, offset = 30): TonalPalette[] {
  return [offset, -offset].map(offset =>
    TonalPalette.fromHueAndChroma((palette.hue + offset + 360) % 360, palette.chroma),
  );
}