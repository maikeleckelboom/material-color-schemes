# Material Color Schemes

**Material Color Schemes** is a set of tools built to simplify and enhance working with color—especially when creating
themes and schemes inspired by Material Design. Designed to work alongside [
`@material/material-color-utilities`](https://www.npmjs.com/package/@material/material-color-utilities), it offers an
extra layer of flexibility and ease.

With a focus on practical workflows, Material Color Schemes makes it easier to generate cohesive, accessible color
systems. Core functions like `createScheme`, `createTheme`, and `generateColorScheme` help streamline the creation of
`DynamicScheme` and `Theme` instances, transforming them into structured color tokens—ideal for use as CSS variables or
design systems.

## ✨ Features

- 🎨 **Create dynamic color schemes** based on Material Design principles
- 🧱 **Build full themes** ready to power consistent, scalable UI systems
- 🧪 **Generate color tokens** for use as CSS variables or in design tokens
- 🌗 **Support for dark and light modes** baked into the scheme generation
- ⚙️ **Flexible API** that works well for both quick prototyping and full-scale design systems
- 🤝 **Designed to extend** `@material/material-color-utilities` without getting in the way
- ♿ **Accessibility-friendly**, with built-in contrast-aware color handling

## ℹ️ Alignment with Official Material Design Package

This library is designed to align as closely as possible with the official Material Design package. However, please
note that the Material Design team's focus is not on maintaining a TypeScript version of their source code. As a result,
updates or changes in the official implementation may lead to corresponding updates in this library to ensure continued
compatibility.

> ✨ **Supports both HEX and ARGB** while providing integration points that are familiar to users of the official
`@material/material-color-utilities`.
> This approach eases integration into existing workflows and allows for flexibility in customization.

## 📦 Installation

The `material-color-schemes` package depends on [
`@material/material-color-utilities`](https://www.npmjs.com/package/@material/material-color-utilities) as a peer
dependency. This means if you already have `@material/material-color-utilities` installed in your project, you can
simply install `material-color-schemes` by itself. Otherwise, you should install both packages together.

### Option 1: If you do **not** already have `@material/material-color-utilities`

```bash
npm install @material/material-color-utilities material-color-schemes
```

### Option 2: If you **already** have `@material/material-color-utilities`

```bash
npm install material-color-schemes
````

## 🚀 Quick Start

```ts
import { createTheme, Variant, ContrastLevel } from 'material-color-schemes';

const theme = createTheme('#6200EE', {
  primary: '#3700B3',
  secondary: '#03DAC6',
  tertiary: '#FF9800',
  neutral: '#FFFFFF',
  neutralVariant: '#F5F5F5',
  variant: Variant.TONAL_SPOT,
  contrastLevel: ContrastLevel.DEFAULT,
  staticColors: [
    {
      name: 'My Static Color',
      value: '#FF5733'
    },
    {
      name: 'Harmonic Color',
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
    accent: colorScheme.primary,
  })
})

const cssVariables = formatCssVarMapping(colorScheme)
```