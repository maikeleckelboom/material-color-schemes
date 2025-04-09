// Configuration and settings
export {
  ContrastLevel,
  getClosestContrastLevel,
  listContrastLevels,
  listVariants,
  type ConfigOption,
} from './config';
export {
  DEFAULT_PALETTE_TONES,
  DEFAULT_SCORE_OPTIONS,
  DEFAULT_QUANTIZE_MAX_COLORS,
} from '../constants';

// Theme and scheme creation
export { createTheme } from './theme';
export { createScheme } from './scheme';
export { createColorScheme } from './color-scheme.ts';

// conversion.ts – For color-space transformations
export {
  convertToArgb,
  convertToHex,
  convertToHct,
  convertToLab,
  convertToRgb,
  convertToLstar,
} from './conversion.ts';

// formatting.ts – For string/UI representations
export { formatColorName, formatCssVarName, formatCssVars } from './formatting.ts';

export { harmonize, blendHue, blendCam } from './blend.ts';
export { createCustomColor } from './color.ts';
export { quantizeColors } from './quantize.ts';

// Palette generation and management
export { createTonalPalette, createTonalPaletteColors, getTonalPaletteColors } from './palette.ts';

// Contrast and accessibility
export { getContrastRatioOfTones, getContrastColor, isContrasting } from './contrast.ts';
export { isDisliked, fixIfDisliked } from './dislike.ts';

// Analysis and recommendations
export { scoreColorToCount, type ScoreOptions } from './scoring.ts';
