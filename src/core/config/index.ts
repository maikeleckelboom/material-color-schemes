export type ConfigOption = {
  id: string;
  name: string;
  description?: string;
  value: number;
};

export { Variant, listVariants, mapVariantToScheme } from './variant';
export { ContrastLevel, listContrastLevels, getClosestContrastLevel } from './contrast-level';
