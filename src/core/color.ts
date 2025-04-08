import type {Color, CustomColor} from "../types/color.ts";
import {customColor, type CustomColorGroup} from "@material/material-color-utilities";
import {convertToArgb} from "./conversion.ts";

/**
 * Create a custom color group with a custom color.
 *
 * @param designColor The design color used when blending.
 * @param staticColor The custom color to use in the custom color group.
 * @returns The custom color group, or null if the static color is invalid.
 */
export function createCustomColor(designColor: Color, staticColor: CustomColor): CustomColorGroup {
    const {name, blend = false} = staticColor
    const source = convertToArgb(designColor)
    const value = convertToArgb(staticColor.value)
    return customColor(source, {name, value, blend})
}
