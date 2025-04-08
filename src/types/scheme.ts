import type { Variant } from '../core/config';
import type { Color } from './color-scheme.ts';

export interface DefaultSchemeOptions {
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
  | (DefaultSchemeOptions & { primary: Color; seedColor?: Color })
  | (DefaultSchemeOptions & { seedColor: Color; primary?: Color });
