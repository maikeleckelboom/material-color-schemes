import { TonalPalette } from '@material/material-color-utilities';
import { convertToArgb } from './conversion.ts';
import { DEFAULT_PALETTE_TONES } from '../constants';
import type { Color } from '../types';

export function createTonalPalette(color: Color): TonalPalette {
  return TonalPalette.fromInt(convertToArgb(color));
}

export function createTonalPaletteColors(
  colorOrPalette: Color | TonalPalette,
  paletteTones: number[] = [...DEFAULT_PALETTE_TONES],
): Record<number, number> {
  if (!(colorOrPalette instanceof TonalPalette)) {
    colorOrPalette = createTonalPalette(colorOrPalette);
  }
  return getTonalPaletteColors(colorOrPalette, paletteTones);
}

export function getTonalPaletteColors(
  palette: TonalPalette,
  tones: number[],
): Record<number, number> {
  return Object.fromEntries(tones.map((tone) => [tone, palette.tone(tone)]));
}
