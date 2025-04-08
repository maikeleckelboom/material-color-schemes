import {
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from '@material/material-color-utilities'
import type { ConfigOption } from './'

export const Variant = {
  MONOCHROME: 0,
  NEUTRAL: 1,
  TONAL_SPOT: 2,
  VIBRANT: 3,
  EXPRESSIVE: 4,
  FIDELITY: 5,
  CONTENT: 6,
  RAINBOW: 7,
  FRUIT_SALAD: 8,
} as const

export type Variant = (typeof Variant)[keyof typeof Variant]

const VARIANT_TO_SCHEME_MAP = {
  [Variant.MONOCHROME]: SchemeMonochrome,
  [Variant.NEUTRAL]: SchemeNeutral,
  [Variant.TONAL_SPOT]: SchemeTonalSpot,
  [Variant.VIBRANT]: SchemeVibrant,
  [Variant.EXPRESSIVE]: SchemeExpressive,
  [Variant.FIDELITY]: SchemeFidelity,
  [Variant.CONTENT]: SchemeContent,
  [Variant.RAINBOW]: SchemeRainbow,
  [Variant.FRUIT_SALAD]: SchemeFruitSalad,
} as const

const VARIANT_LABELS: Record<Variant, string> = {
  [Variant.MONOCHROME]: 'Monochrome',
  [Variant.NEUTRAL]: 'Neutral',
  [Variant.TONAL_SPOT]: 'Tonal Spot',
  [Variant.VIBRANT]: 'Vibrant',
  [Variant.EXPRESSIVE]: 'Expressive',
  [Variant.FIDELITY]: 'Fidelity',
  [Variant.CONTENT]: 'Content',
  [Variant.RAINBOW]: 'Rainbow',
  [Variant.FRUIT_SALAD]: 'Fruit Salad',
}

export function mapVariantToScheme(variant: Variant) {
  return VARIANT_TO_SCHEME_MAP[variant]
}

export function listVariants(): ConfigOption[] {
  return Object.entries(Variant)
    .map(([id, value]) => ({
      id,
      value: value as Variant,
      name: VARIANT_LABELS[value as Variant],
    }))
}
