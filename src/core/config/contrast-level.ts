import type { ConfigOption } from './'

export const ContrastLevel = {
  DEFAULT: 0,
  MEDIUM: 0.25,
  HIGH: 0.5,
  REDUCED: -1,
} as const

export type ContrastLevel = (typeof ContrastLevel)[keyof typeof ContrastLevel]

const CONTRAST_LEVEL_LABELS: Readonly<Record<ContrastLevel, string>> = {
  [ContrastLevel.DEFAULT]: 'Default',
  [ContrastLevel.MEDIUM]: 'Medium',
  [ContrastLevel.HIGH]: 'High',
  [ContrastLevel.REDUCED]: 'Reduced',
}

const CONTRAST_LEVELS = Object.entries(ContrastLevel)
  .map(([id, value]) => ({
    id,
    value: value as ContrastLevel,
    name: CONTRAST_LEVEL_LABELS[value],
  }))
  .sort((a, b) => a.value - b.value)

const REDUCED_LEVEL = CONTRAST_LEVELS.find((level) => level.value === ContrastLevel.REDUCED)!
const NON_NEGATIVE_LEVELS = CONTRAST_LEVELS.filter((level) => level.value >= 0)
const NON_NEGATIVE_LEVELS_DESC = [...NON_NEGATIVE_LEVELS].reverse()
const DEFAULT_LEVEL = CONTRAST_LEVELS.find((level) => level.value === ContrastLevel.DEFAULT)!

export function listContrastLevels(): ConfigOption[] {
  return CONTRAST_LEVELS
}

export function getClosestContrastLevel(targetLevel: number): ConfigOption {
  if (targetLevel < 0) return REDUCED_LEVEL

  for (const level of NON_NEGATIVE_LEVELS_DESC) {
    if (targetLevel >= level.value) return level
  }

  return DEFAULT_LEVEL
}
