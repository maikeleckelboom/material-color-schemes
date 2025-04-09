import {
  argbFromHex,
  Hct,
  hexFromArgb,
  labFromArgb,
  lstarFromArgb,
  rgbaFromArgb,
} from '@material/material-color-utilities';
import type { Color } from '../types';

/** Convert color to ARGB format */
export function convertToArgb(color: Color) {
  if (typeof color === 'string') {
    if (!/^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color)) {
      throw new Error(`Invalid color format: ${color}`);
    }
    return argbFromHex(color);
  }
  return color;
}

/** Convert ARGB color to RGB format */
export function convertToRgb(color: Color): string {
  const argbColor = convertToArgb(color);
  const rgbColor = rgbaFromArgb(argbColor);
  return `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
}

/** Convert ARGB color to hex format */
export function convertToHex(color: Color): string {
  const argbColor = convertToArgb(color);
  return hexFromArgb(argbColor);
}

/** Convert ARGB color to HCT format */
export function convertToHct(color: Color): Hct {
  const argbColor = convertToArgb(color);
  return Hct.fromInt(argbColor);
}

/**
 * Convert a ARGB or HEX color to LAB format
 */
export function convertToLab(color: Color) {
  const argb = convertToArgb(color);
  return labFromArgb(argb);
}

/**
 * Measures the lightness of a color in the CIE L*a*b* color space.
 */
export function convertToLstar(color: Color): number {
  return lstarFromArgb(convertToArgb(color));
}
