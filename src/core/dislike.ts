import {DislikeAnalyzer, Hct} from '@material/material-color-utilities'
import {convertToArgb} from './conversion'
import type {Color} from "../types";

export function isDisliked(color: Color): boolean {
    const argb = convertToArgb(color)
    const hct = Hct.fromInt(argb)
    return DislikeAnalyzer.isDisliked(hct)
}

export function fixIfDisliked(color: Color): number {
    const argb = convertToArgb(color)
    const hct = Hct.fromInt(argb)
    return DislikeAnalyzer.fixIfDisliked(hct).toInt()
}
