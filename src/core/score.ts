import {Score} from '@material/material-color-utilities'
import {DEFAULT_SCORE_OPTIONS} from "./constants.ts";

export interface ScoreOptions {
    desired?: number
    filter?: boolean
    fallbackColorARGB?: number
}

export function score(colorToCount: Map<number, number>, options: ScoreOptions = DEFAULT_SCORE_OPTIONS): [number, ...number[]] {
    return Score.score(colorToCount, options) as [number, ...number[]]
}
