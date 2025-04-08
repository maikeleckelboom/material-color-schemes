import type {Color} from "../types/color.ts";
import {lstarFromArgb} from "@material/material-color-utilities";
import {convertToArgb} from "./conversion.ts";

export function lstarFromColor(color: Color): number {
    return lstarFromArgb(convertToArgb(color));
}