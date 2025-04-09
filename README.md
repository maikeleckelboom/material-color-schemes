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
npm install @material/material-color-utilities material-color-kit
```

## 🚀 Quick Start

```ts
import { createScheme, createTheme } from 'material-color-kit';
import { DynamicScheme, Theme } from '@material/material-color-utilities';

const scheme = createScheme('#6200EE', {
  primary: '#3700B3',
  secondary: '#03DAC6',
});

const theme = createTheme('#6200EE', {
  primary: '#3700B3',
  secondary: '#03DAC6',
});
```

```ts
import { generateColorScheme, formatCssVars } from 'material-color-kit';

const theme = createTheme('#6200EE', {
  primary: '#3700B3',
  secondary: '#03DAC6',
});

const colorScheme = generateColorScheme(theme, {
  dark: true,
  modifyColorScheme: (colorScheme) => ({
    ...colorScheme,
    accent: '#FF5733',
  })
})

const cssVariables = formatCssVars(colorScheme)
```
