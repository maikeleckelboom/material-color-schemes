import { Contrast, Hct } from '@material/material-color-utilities';
import type { Color } from '../types';
import { convertToArgb } from './conversion.ts';

/**
 * Get a contrasting tone based on a base tone and a contrast ratio.
 *
 * @param baseTone - The base tone.
 * @param ratio - The contrast ratio.
 * @param preferLighter - Whether to prefer a lighter or darker tone. Default is true (lighter).
 * @returns The contrasting tone.
 */
function getContrastingTone(baseTone: number, ratio: number, preferLighter: boolean): number {
  if (preferLighter) return Contrast.lighter(baseTone, ratio);
  else return Contrast.darker(baseTone, ratio);
}

/**
 * Get the best contrasting tone based on a base tone and a contrast ratio.
 *
 * @param tone - The base tone.
 * @param ratio - The contrast ratio.
 * @returns The best contrasting tone.
 */
function getBestContrastingTone(tone: number, ratio: number = 7.0): number {
  const contrastWithDark = Contrast.ratioOfTones(tone, 0);
  const contrastWithLight = Contrast.ratioOfTones(tone, 100);
  return getContrastingTone(tone, ratio, contrastWithLight > contrastWithDark);
}

/**
 * Calculate the contrast ratio between two colors.
 *
 * @param color1 - The first color.
 * @param color2 - The second color.
 * @returns The contrast ratio between the two colors.
 */
export function getContrastRatioOfTones(color1: Color, color2: Color): number {
  return Contrast.ratioOfTones(convertToArgb(color1), convertToArgb(color2));
}

/**
 * Get the contrast color for a given color.
 *
 */
export function getContrastColor(color: Color): number {
  const argb = convertToArgb(color);
  const { hue, chroma, tone } = Hct.fromInt(argb);
  const contrastTone = getBestContrastingTone(tone);
  return Hct.from(hue, chroma, contrastTone).toInt();
}

/**
 * Check if two colors have a contrast ratio greater than or equal to a specified minimum.
 *
 * @param color1 - The first color.
 * @param color2 - The second color.
 * @param minRatio - The minimum contrast ratio to check against. Default is 4.5.
 */
export function isContrasting(color1: Color, color2: Color, minRatio: number = 4.5): boolean {
  return getContrastRatioOfTones(color1, color2) >= minRatio;
}
