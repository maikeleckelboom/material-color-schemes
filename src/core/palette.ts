import {TonalPalette} from "@material/material-color-utilities";
import {convertToArgb} from "./conversion.ts";
import type {Color} from "../types/color.ts";
import {DEFAULT_PALETTE_TONES} from "./constants.ts";

export function createTonalPalette(color: Color): TonalPalette {
    return TonalPalette.fromInt(convertToArgb(color))
}

export function getColorsForTones(
    tonalPalette: Color | TonalPalette,
    paletteTones: number[] = DEFAULT_PALETTE_TONES
): Record<number, number> {
    if (!(tonalPalette instanceof TonalPalette)) {
        tonalPalette = createTonalPalette(tonalPalette)
    }
    const result: Record<number, number> = {}
    for (const tone of paletteTones) {
        result[tone] = tonalPalette.tone(tone)
    }
    return result
}