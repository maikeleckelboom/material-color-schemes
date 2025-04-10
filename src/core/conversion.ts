import {
  argbFromHex,
  Hct,
  hexFromArgb,
  labFromArgb,
  lstarFromArgb,
  type Rgba,
  rgbaFromArgb,
  xyzFromArgb,
} from '@material/material-color-utilities';
import type { Color } from '../types';

/** Convert color to ARGB format */
export function convertToArgb(color: Color) {
  if (typeof color === 'number') {
    return color;
  }
  return argbFromHex(color);
}

/** Convert ARGB or HEX color to RGB format */
export function convertToRgba(color: Color): Rgba {
  const argbColor = convertToArgb(color);
  return rgbaFromArgb(argbColor);
}

/** Convert ARGB color to HEX format */
export function convertToHex(color: Color): string {
  const argbColor = convertToArgb(color);
  return hexFromArgb(argbColor);
}

/** Convert ARGB or HEX color to HCT format */
export function convertToHct(color: Color): Hct {
  const argbColor = convertToArgb(color);
  return Hct.fromInt(argbColor);
}

/** Convert a ARGB or HEX color to LAB format */
export function convertToLab(color: Color): number[] {
  const argbColor = convertToArgb(color);
  return labFromArgb(argbColor);
}

/** Measures the lightness of a color in the CIE L*a*b* color space */
export function convertToLstar(color: Color): number {
  const argbColor = convertToArgb(color);
  return lstarFromArgb(argbColor);
}

/** Convert ARGB or HEX color to XYZ format */
export function convertToXyz(color: Color): number[] {
  const argbColor = convertToArgb(color);
  return xyzFromArgb(argbColor);
}
