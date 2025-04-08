import {customColor as toCustomColor, type CustomColorGroup, lstarFromArgb} from "@material/material-color-utilities";
import {convertToArgb} from "./conversion.ts";
import type {Color, CustomColor} from "../types";

/**
 * Create a custom color group with a custom color.
 *
 * @param designColor The design color used when blending.
 * @param customColor The custom color to use in the custom color group.
 * @returns The custom color group, or null if the static color is invalid.
 */
export function createCustomColor(designColor: Color, customColor: CustomColor): CustomColorGroup {
    const {name, blend = false} = customColor
    const source = convertToArgb(designColor)
    const value = convertToArgb(customColor.value)
    return toCustomColor(source, {name, value, blend})
}


/**
 * Get the l* value from a color.
 * (L* is a measure of lightness in the CIE L*a*b* color space.)
 *
 * @param color The color as a string (hex) or ARGB value.
 * @returns The l* value of the color.
 */
export function lstarFromColor(color: Color): number {
    return lstarFromArgb(convertToArgb(color));
}