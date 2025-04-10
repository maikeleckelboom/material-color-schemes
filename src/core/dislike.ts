import { DislikeAnalyzer, Hct } from '@material/material-color-utilities';
import { toArgb } from './conversion';
import type { Color } from '../types';

export function isDisliked(color: Color): boolean {
  const argb = toArgb(color);
  const hct = Hct.fromInt(argb);
  return DislikeAnalyzer.isDisliked(hct);
}

export function fixDislikedColor(color: Color): number {
  const argb = toArgb(color);
  const hct = Hct.fromInt(argb);
  return DislikeAnalyzer.fixIfDisliked(hct).toInt();
}
