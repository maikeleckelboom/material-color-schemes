import {QuantizerCelebi} from "@material/material-color-utilities";
import {DEFAULT_QUANTIZE_MAX_COLORS} from "./constants.ts";

export function quantize(
    pixelsArray: number[],
    maxColors: number = DEFAULT_QUANTIZE_MAX_COLORS,
): Map<number, number> {
    return QuantizerCelebi.quantize(pixelsArray, maxColors)
}