import type {ColorScheme} from "../types/color-scheme.ts";

export function applyAmoledFilter<T extends ColorScheme>(colorScheme: T): T {
    const blackARGB: number = 4278190080
    return {
        ...colorScheme,
        background: blackARGB,
        surface: blackARGB,
    }
}