// Configuration and settings
export {
  Variant,
  ContrastLevel,
  getClosestContrastLevel,
  listContrastLevels,
  listVariants,
  type ConfigOption,
} from './config';

// Theme and scheme creation
export { createScheme } from './scheme';
export { createTheme } from './theme';
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
export { formatColorName, formatCssVarName, formatCssVarMapping } from './formatting.ts';

export { harmonize, blendHue, blendCam } from './blend.ts';
export { createCustomColor } from './color.ts';
export { quantizeColors } from './quantize.ts';

// Palette generation and management
export { createPalette, mapPaletteTones, extractPaletteColors } from './palette.ts';

// Contrast and accessibility
export { getContrastRatioOfTones, getContrastColor, isContrasting } from './contrast.ts';
export { isDisliked, fixIfDisliked } from './dislike.ts';

// Analysis and recommendations
export { scoreColorToCount, type ScoreOptions } from './scoring.ts';
