# Material Schemes Library

A lightweight library that makes it simple to create Material Design themes and color schemes for your apps or websites.
It works in tandem
with [@material/material-color-utilities](https://www.npmjs.com/package/@material/material-color-utilities), offering an
extra layer of flexibility to start with just one color and generate a full set of coordinated, accessible palettes.

Engineered to streamline practical workflows, the library’s core functions—`createScheme`, `createTheme`, and
`createPalette`—produce cohesive color systems (`DynamicScheme`, `Theme`, and `TonalPalette` instances) quickly and
reliably. The `createColorScheme` method then transforms these into fully functional schemes for your project.

---

## Features

- **Complete Material Design 3 Color System**: Implements the full set of guidelines.
- **Light/Dark Theme Automation**: Generates both themes automatically.
- **Custom Color Creation**: Includes automatic harmonization.
- **Accessibility Tools**: Built-in contrast checking.
- **Color Space Conversions**: Supports HEX, RGB, HCT, and LAB.
- **CSS Variable Generation**: Easily converts colors for styling.
- **Fully Typed API**: Built with full TypeScript support.

---

## Installation

Install the library via npm:

```bash
npm install @material/material-color-utilities material-schemes
```

---

## API Overview

### `createScheme`

**Purpose:** Generates a dynamic color scheme from a source color or a complete options object.

- **Usage with a source color:**

  ```javascript
  const scheme = createScheme(0xff0000, { isDark: true });
  ```

    - **Parameters:**
        - `sourceColor`: A hex color (for example, `0xff0000` for red).
        - `options` (optional): Includes settings like `isDark`, `variant`, or `contrastLevel`.

- **Usage with an options object:**

  ```javascript
  const scheme = createScheme({
    sourceColor: 0x00ff00,
    secondary: 0x0000ff,
    isDark: true
  });
  ```

    - **Returns:** A `DynamicScheme` object containing color keys like `primary`, `onPrimary`, etc.

**Note:**  
Providing only a `sourceColor` lets the library auto-generate a comprehensive set of color palettes. You can use
`createScheme` directly for single-scheme control or let `createTheme` handle full theme generation.

---

### `createTheme`

**Purpose:** Creates a complete Material Design theme, including light and dark variants with customizable palettes.

- **Usage with a source color:**

  ```javascript
  const theme = createTheme(0xff0000, { contrastLevel: ContrastLevel.HIGH });
  ```

    - **Parameters:**
        - `sourceColor`: A hex color (for example, `0xff0000`).
        - `options` (optional): Options such as `variant` or `contrastLevel`.

- **Usage with an options object:**

  ```javascript
  const theme = createTheme({
    sourceColor: 0x00ff00,
    variant: Variant.EXPRESSIVE,
    primary: 0xff0000 // Override primary color
  });
  ```

    - **Returns:** A `Theme` object that includes both light and dark schemes, along with custom palettes.

**Under the Hood:**  
`createTheme` calls `createScheme` twice (for light and dark) to form a complete theme in one step.

---

## Alignment with Official Material Design

This library is designed to mirror the official Material Design package as closely as possible. However, note that the
Material Design team does not maintain a TypeScript version of their code. As a result, changes in the official
implementation may necessitate updates in this library to ensure compatibility.

- **Versioning & Compatibility:** Follows semantic versioning. Breaking changes may occur with major updates.
- **Community Involvement:** Contributions, issue reports, and feedback are encouraged to help maintain quality and
  alignment.

---

## Tips

- **Color Input:** Use either hex strings (like `#FF0000`) or numbers (like `0xff0000`).
- **Getting Started:**
    - Use `createTheme` if you want a full theme generated automatically.
    - Use `createScheme` for more granular control over a single color scheme.

---

License
This library is open-source and available under the MIT License.