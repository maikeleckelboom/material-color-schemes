import {argbFromHex, Hct, hexFromArgb, labFromArgb, rgbaFromArgb} from '@material/material-color-utilities'
import type {Color} from "../types";

/** Convert color to ARGB format */
export function convertToArgb(color: Color) {
    return typeof color === 'string' ? argbFromHex(color) : color
}

/** Convert ARGB color to hex format */
export function convertToHex(color: Color): string {
    const argbColor = convertToArgb(color)
    return hexFromArgb(argbColor)
}

/** Convert ARGB color to RGB format */
export function convertToRgb(color: Color): string {
    const argbColor = convertToArgb(color)
    const rgbColor = rgbaFromArgb(argbColor)
    return `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`
}

/** Convert ARGB color to HCT format */
export function convertToHct(color: Color): Hct {
    const argbColor = convertToArgb(color)
    return Hct.fromInt(argbColor)
}

/**
 * Convert ARGB color to Lab format
 * @param color - The color to convert, in ARGB or HEX format
 */
export function convertToLab(color: Color) {
    const argb = convertToArgb(color);
    return labFromArgb(argb);
}