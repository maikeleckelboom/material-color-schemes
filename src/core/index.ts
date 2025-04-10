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
  deriveColorsFromScheme,
  deriveCustomColorsFromTheme,
  derivePaletteColorsFromTheme,
  mapPaletteToTonalKeys,
} from './color-scheme.ts';

// conversion.ts – For color-space transformations
export {
  convertToArgb,
  convertToHex,
  convertToRgba,
  convertToHct,
  convertToLab,
  convertToXyz,
  convertToLstar,
} from './conversion.ts';

// formatting.ts – For string/UI representations
export {
  formatColorPattern,
  formatTokenName,
  formatCssVarName,
  type FormatOptions,
} from './formatting.ts';

// css-vars.ts - For CSS variable generation
export {
  buildCssVarMapping,
  stringifyCssVarMapping,
  createCssVariables,
} from './css-vars.ts';

export { harmonize, blendHue, blendCam } from './blend.ts';
export { createCustomColor } from './color.ts';
export { quantizeColors } from './quantize.ts';

// Palette generation and management
export {
  createPalette,
  createAnalogousPalettes,
  createComplementaryPalette,
  extractPaletteColors,
  isColorInPalette,
} from './palette.ts';

// Contrast and accessibility
export { getContrastRatio, getContrastColor, isContrasting } from './contrast.ts';
export { isDisliked, fixIfDisliked } from './dislike.ts';

// Analysis and recommendations
export { calculateColorScore, type ScoreOptions } from './scoring.ts';
