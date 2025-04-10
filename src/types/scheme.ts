import type { Variant } from '../core/config';
import type { Color } from './color-scheme.ts';

export interface CoreSchemeOptions {
  primary?: Color;
  secondary?: Color;
  tertiary?: Color;
  neutral?: Color;
  neutralVariant?: Color;
  contrastLevel?: number;
  variant?: Variant;
  isDark?: boolean;
}

export type SchemeOptions =
  | (CoreSchemeOptions & { primary: Color; sourceColor?: Color })
  | (CoreSchemeOptions & { sourceColor: Color; primary?: Color });
