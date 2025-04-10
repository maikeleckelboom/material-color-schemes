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
export {
  createColorScheme,
  createColorsFromScheme,
  createCustomColorsFromTheme,
  createPaletteFromTheme,
  mapPaletteToTonalKeys,
} from './color-scheme.ts';

// conversion.ts – For color-space transformations
export {
  toArgb,
  toHex,
  toRgba,
  toHct,
  toLab,
  toXyz,
  toLstar,
  getAlpha,
  getRed,
  getGreen,
  getBlue,
} from './conversion.ts';

// formatting.ts – For string/UI representations
export {
  formatColorPattern,
  formatTokenName,
  formatCssVarName,
  type FormatOptions,
} from './formatting.ts';

// css-vars.ts - For CSS variable generation
export { createCssVarMap, serializeCssVarMap, createCssVariables } from './css-vars.ts';

// blend.ts – For color manipulation and blending
export { harmonize, blendHue, blendCam } from './blend.ts';
// color.ts – For color creation and manipulation
export { createCustomColor } from './color.ts';
// quantize.ts – For image quantization
export { quantizeColors } from './quantize.ts';

// Palette generation and management
export {
  createPalette,
  createAnalogousPalettes,
  createComplementaryPalette,
  getPaletteColors,
  isColorInPalette,
} from './palette.ts';

// Contrast and accessibility
export { getContrastRatio, getContrastColor, isContrasting } from './contrast.ts';
export { isDisliked, fixDislikedColor } from './dislike.ts';

// Analysis and recommendations
export { createColorScore, type ScoreOptions } from './scoring.ts';
