import {
  customColor as toCustomColor,
  type CustomColorGroup,
  lstarFromArgb,
} from '@material/material-color-utilities';
import { toArgb } from './conversion.ts';
import type { Color, StaticColor } from '../types';

/**
 * Create a custom color group with a custom color.
 *
 * @param sourceColor The design color used when blending.
 * @param staticColor The custom color to use in the custom color group.
 * @returns The custom color group, or null if the static color is invalid.
 */
export function createCustomColor(
  sourceColor: Color,
  staticColor: StaticColor,
): CustomColorGroup {
  const { name, blend = false } = staticColor;
  const source = toArgb(sourceColor);
  const value = toArgb(staticColor.value);
  return toCustomColor(source, { name, value, blend });
}
