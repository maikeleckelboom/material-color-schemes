import { Blend } from '@material/material-color-utilities'
import type {Color} from "../types/color.ts";
import {convertToArgb} from "./conversion.ts";

/**
 * Blend the design color's HCT hue towards the key color's HCT
 * hue, in a way that leaves the original color recognizable and
 * recognizably shifted towards the key color.
 *
 * @param designColor ARGB representation of an arbitrary color.
 * @param sourceColor ARGB representation of the main theme color.
 * @return The design color with a hue shifted towards the
 * system's color, a slightly warmer/cooler variant of the design
 * color's hue.
 */
export function harmonize(designColor: Color, sourceColor: Color): number {
  return Blend.harmonize(convertToArgb(designColor), convertToArgb(sourceColor))
}

/**
 * Blends hue from one color into another. The chroma and tone of
 * the original color are maintained.
 *
 * @param from ARGB representation of color
 * @param to ARGB representation of color
 * @param amount how much blending to perform; 0.0 >= and <= 1.0
 * @return from, with a hue blended towards to. Chroma and tone
 * are constant.
 */
export function blendHue(from: number, to: number, amount: number): number {
  return Blend.hctHue(from, to, amount)
}

/**
 * Blend in CAM16-UCS space.
 *
 * @param from ARGB representation of color
 * @param to ARGB representation of color
 * @param amount how much blending to perform; 0.0 >= and <= 1.0
 * @return from, blended towards to. Hue, chroma, and tone will
 * change.
 */
export function blendCam(from: number, to: number, amount: number): number {
  return Blend.cam16Ucs(from, to, amount)
}