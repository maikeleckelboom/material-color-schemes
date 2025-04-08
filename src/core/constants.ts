import type {ScoreOptions} from "./score.ts";

export const DEFAULT_QUANTIZE_MAX_COLORS: number = 128 as const

export const DEFAULT_PALETTE_TONES: number[] = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100]

export const DEFAULT_SCORE_OPTIONS: ScoreOptions = {
    desired: 5,
    filter: true,
    fallbackColorARGB: 0xFF000000,
}