import { Blend } from '@material/material-color-utilities'
import type {Color} from "../types/color.ts";
import {convertToArgb} from "./conversion.ts";

export function harmonize(designColor: Color, sourceColor: Color): number {
  return Blend.harmonize(convertToArgb(designColor), convertToArgb(sourceColor))
}