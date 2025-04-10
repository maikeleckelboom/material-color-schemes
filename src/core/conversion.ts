import {
  alphaFromArgb,
  argbFromHex,
  blueFromArgb,
  greenFromArgb,
  Hct,
  hexFromArgb,
  labFromArgb,
  lstarFromArgb,
  redFromArgb,
  type Rgba,
  rgbaFromArgb,
  xyzFromArgb,
} from '@material/material-color-utilities';
import type { Color } from '../types';

/** Convert color to ARGB format */
export function toArgb(color: Color): number {
  if (typeof color === 'number') {
    return color;
  }
  return argbFromHex(color);
}

/** Convert ARGB color to HEX format */
export function toHex(color: Color): string {
  const argbColor = toArgb(color);
  return hexFromArgb(argbColor);
}

/** Convert ARGB or HEX color to HCT format */
export function toHct(color: Color): Hct {
  const argbColor = toArgb(color);
  return Hct.fromInt(argbColor);
}

/** Convert ARGB or HEX color to RGB format */
export function toRgba(color: Color): Rgba {
  const argbColor = toArgb(color);
  return rgbaFromArgb(argbColor);
}

/** Convert a ARGB or HEX color to LAB format */
export function toLab(color: Color): number[] {
  const argbColor = toArgb(color);
  return labFromArgb(argbColor);
}

/** Measures the lightness of a color in the CIE L*a*b* color space */
export function toLstar(color: Color): number {
  const argbColor = toArgb(color);
  return lstarFromArgb(argbColor);
}

/** Convert ARGB or HEX color to XYZ format */
export function toXyz(color: Color): number[] {
  const argbColor = toArgb(color);
  return xyzFromArgb(argbColor);
}

/** Return the alpha value of a color in HEX or ARGB format */
export function toAlpha(color: Color): number {
  const argbColor = toArgb(color);
  return alphaFromArgb(argbColor);
}

/** Return the red value of a color in HEX or ARGB format */
export function toRed(color: Color): number {
  const argbColor = toArgb(color);
  return redFromArgb(argbColor);
}

/** Return the green value of a color in HEX or ARGB format */
export function toGreen(color: Color): number {
  const argbColor = toArgb(color);
  return greenFromArgb(argbColor);
}

/** Return the blue value of a color in HEX or ARGB format */
export function toBlue(color: Color): number {
  const argbColor = toArgb(color);
  return blueFromArgb(argbColor);
}
