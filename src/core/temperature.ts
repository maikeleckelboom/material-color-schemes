import {Hct, TemperatureCache} from "@material/material-color-utilities";
import {convertToArgb} from "./conversion.ts";
import type {Color} from "../types/color.ts";

export function isColdColor(color: Color) {
    const hct = Hct.fromInt(convertToArgb(color))
    const cache = new TemperatureCache(hct)
    return cache.inputRelativeTemperature <= 0.5
}

export function isWarmColor(color: Color) {
    const hct = Hct.fromInt(convertToArgb(color))
    const cache = new TemperatureCache(hct)
    return cache.inputRelativeTemperature > 0.5
}