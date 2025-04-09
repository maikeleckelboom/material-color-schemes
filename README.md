# Material Color Kit (WIP)

**Material Color Kit** is a set of tools built to simplify and enhance working with color—especially when creating
themes and schemes inspired by Material Design. Designed to work alongside [
`@material/material-color-utilities`](https://www.npmjs.com/package/@material/material-color-utilities), it offers an
extra layer of flexibility and ease.

With a focus on practical workflows, Material Color Kit makes it easier to generate cohesive, accessible color systems.
Core functions like `createScheme`, `createTheme`, and `generateColorScheme` help streamline the creation of
`DynamicScheme` and `Theme` instances, and transform them into structured color tokens—ideal for use as CSS variables or
in design systems.

## ✨ Features

- 🎨 **Create dynamic color schemes** based on Material Design principles
- 🧱 **Build full themes** ready to power consistent, scalable UI systems
- 🧪 **Generate color tokens** for use as CSS variables or in design tokens
- 🌗 **Support for dark and light modes** baked into the scheme generation
- ⚙️ **Flexible API** that works well for both quick prototyping and full-scale design systems
- 🤝 **Designed to extend** `@material/material-color-utilities` without getting in the way
- ♿ **Accessibility-friendly**, with built-in contrast-aware color handling

> ✨ **Supports both HEX and ARGB** formats as input, while maintaining the same return types as the official
`@material/material-color-utilities`. This makes it easy to integrate with existing workflows and provides more
> flexibility without changing behavior.

## 📦 Installation

```bash
npm install @material/material-color-utilities md-color-schemes
```

## 🚀 Quick Start

```ts
import { createTheme, Variant, ContrastLevel } from 'md-color-schemes';

const theme = createTheme('#6200EE', {
  primary: '#3700B3',
  secondary: '#03DAC6',
  tertiary: '#FF9800',
  neutral: '#FFFFFF',
  neutralVariant: '#F5F5F5',
  variant: Variant.TONAL_SPOT,
  contrastLevel: ContrastLevel.DEFAULT,
  customColors: [
    {
      name: 'My Custom Color',
      value: '#FF5733'
    },
    {
      name: 'My Custom Color 2',
      value: '#AB47BC',
      blend: true
    }
  ]
});

const colorScheme = generateColorScheme(theme, {
  dark: true,
  brightnessVariants: true,
  modifyColorScheme: (colorScheme) => ({
    ...colorScheme,
    tertiary: '#CE93D8',
    accent: '#FF5733',
  })
})

const cssVariables = formatCssVarMapping(colorScheme)
```