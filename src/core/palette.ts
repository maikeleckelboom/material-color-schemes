import { TonalPalette } from '@material/material-color-utilities';
import { convertToArgb } from './conversion.ts';
import { DEFAULT_PALETTE_TONES } from '../constants';
import type { Color } from '../types';

function getColorsForTonesFromPalette(tonalPalette: TonalPalette, paletteTones: number[]) {
  const result: Record<number, number> = {};
  for (const tone of paletteTones) {
    result[tone] = tonalPalette.tone(tone);
  }
  return result;
}

export function createTonalPalette(color: Color): TonalPalette {
  return TonalPalette.fromInt(convertToArgb(color));
}

export function getColorsFromPalette(
  tonalPalette: Color | TonalPalette,
  paletteTones: number[] = DEFAULT_PALETTE_TONES,
): Record<number, number> {
  if (!(tonalPalette instanceof TonalPalette)) {
    tonalPalette = createTonalPalette(tonalPalette);
  }
  return getColorsForTonesFromPalette(tonalPalette, paletteTones);
}
