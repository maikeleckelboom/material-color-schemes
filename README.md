# Material Schemes Library

A lightweight library that makes it simple to create Material Design themes and color schemes for your apps or websites.
It works in tandem
with [@material/material-color-utilities](https://www.npmjs.com/package/@material/material-color-utilities), offering an
extra layer of flexibility to start with just one color and generate a full set of coordinated, accessible palettes.

Engineered to streamline practical workflows, the library’s core functions—`createScheme`, `createTheme`, and
`createPalette`—produce cohesive color systems (`DynamicScheme`, `Theme`, and `TonalPalette` instances) quickly and
reliably. The `createColorScheme` method then transforms these into fully functional color schemes for your project.

---

## Features

- **🎨 Complete Material Design 3 Color System**: Implements the full set of guidelines.
- **🌗 Light/Dark Theme Automation**: Generates both themes automatically.
- **🌈 Custom Color Creation**: Includes automatic harmonization.
- **💅 CSS Variable Generation**: Easily integrate with CSS.
- **🛡️ Type-Safe Architecture**: Fully typed with TypeScript

---

## Installation

Material Schemes requires `@material/material-color-utilities` as a peer dependency.

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

- **Usage with an option object:**

  ```javascript
  const scheme = createScheme({
    sourceColor: 0x00ff00,
    secondary: 0x0000ff,
    isDark: true
  });
  ```

    - **Returns:** A `DynamicScheme` object containing color keys like `primary`, `onPrimary`, etc.

**Note:**  
Providing only a `sourceColor` or `primary` lets the library auto-generate a comprehensive set of color palettes. You
can use
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

- **Usage with an option object:**

  ```javascript
  const theme = createTheme({
    sourceColor: 0x00ff00,
    variant: Variant.EXPRESSIVE,
    primary: 0xff0000 // Override
  });
  ```

    - **Returns:** A `Theme` object that includes both light and dark schemes, along with custom palettes.

**Under the Hood:**  
`createTheme` calls `createScheme` twice (for light and dark) to form a complete theme in one step.

---

## Tips

- **Color Input:** Use either hex strings (like `#FF0000`) or numbers (like `0xff0000`).
- **Getting Started:**
    - Use `createTheme` if you want a full theme generated automatically.
    - Use `createScheme` for more granular control over a single color scheme.

---

## Alignment with Official Material Design

This library closely mirrors the official Material Design package, while addressing the fact that there isn’t a maintained TypeScript version available. Updates to the official implementation may require corresponding changes here to stay compatible.

- **Versioning & Compatibility:** Uses semantic versioning; major updates may introduce breaking changes.
- **Community Collaboration:** Contributions, issue reports, and feedback are welcome to help maintain quality and alignment.

---

## Motivation

During my personal projects, I found that a robust solution for creating Material Design themes and color schemes was missing. This library was built to complement the official Material Design package as a peer dependency and provide a more integrated experience.

### Why Choose This Library?

- **Enhanced API:** Provides a high-level interface for crafting color schemes—something the official library lacks.
- **Filling the Gaps:** Many alternative npm packages do not fully implement the latest Material Design specs or offer comprehensive functionality.
- **CLI Support:** Generate color schemes directly from the terminal with the integrated command-line interface.
- **Community Driven:** Open to contributions and pull requests, ensuring ongoing improvement and closer alignment with evolving standards.
- **Built on Experience:** Developed from first-hand experience using Material Design’s intuitive color system in various projects.

---

## Roadmap

- **Current Features:**
    - [x] Dynamic color generation
    - [x] Light and dark theme support
    - [x] CSS variable generation
    - [x] Contrast checking
    - [x] Color space conversions

- **Planned Improvements:**
    - [ ] Site for documentation and examples
    - [ ] CLI tool for generating color schemes
    - [ ] Integration with popular UI frameworks (e.g., React, Vue, Angular).

- **Future Features:**
    - [ ] Support for additional color spaces (e.g., HSL, OKLCH).

---

## Acknowledgments

This library is built on top of the excellent work done by the Material Design team and the
[@material/material-color-utilities](https://www.npmjs.com/package/@material/material-color-utilities) package.


---

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to
this project.

---- 

## License

This library is open-source and available under the MIT License.
