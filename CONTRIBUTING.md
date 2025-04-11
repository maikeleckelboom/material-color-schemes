```markdown
# 🤝 Contributing Guide

Welcome! 👋 We're stoked you're contributing. This document outlines our conventions and structure to keep the codebase
clean, consistent, and maintainable.

Please read this before submitting a PR or contributing new modules.

---

## 🧠 Naming Conventions

We use clear, action-oriented naming conventions throughout the project. Stick to these patterns to keep things
consistent and readable.

| **Context**              | **Prefix / Format**         | **Example**                                  | **Notes**                                                         |
|--------------------------|-----------------------------|----------------------------------------------|-------------------------------------------------------------------|
| **Types & Enums**        | `PascalCase`                | `Variant`, `ContrastLevel`, `ConfigOption`   | Used for `type`/`enum` exports; easily distinguishable.           |
| **Functions (Generic)**  | `camelCase` + action verb   | `createTheme()`, `listVariants()`            | Verb-first for clarity of intent.                                 |
| **Creation Functions**   | `createXyzFromAbc()`        | `createPaletteFromTheme()`                   | Used when generating or transforming data.                        |
| **Get/List Functions**   | `getXyz()` / `listXyz()`    | `getContrastRatio()`, `listContrastLevels()` | "Get" returns single item; "List" returns an array or collection. |
| **Conversion Functions** | `toXyz()`                   | `toHex()`, `toHct()`, `toArgb()`             | Standard format for transforming between color spaces.            |
| **Formatters**           | `formatXyz()`               | `formatCssVarName()`                         | Used for string outputs or naming generation.                     |
| **Booleans / Checks**    | `isXyz()`, `hasXyz()`       | `isDisliked()`, `isColorInPalette()`         | Clear intent to return `true`/`false`.                            |
| **Palette Functions**    | `createXyzPalette()`        | `createAnalogousPalettes()`                  | "Create" emphasizes palette construction logic.                   |
| **CSS Variables**        | `createXyz()`               | `createCssVarMap()`, `createCssVariables()`  | Consistent verb-based naming for generating CSS tokens.           |
| **Blending / Color Ops** | `blendXyz()`, `harmonize()` | `blendHue()`, `harmonize()`                  | Operations that modify or mix colors.                             |
| **Scoring / Analysis**   | `createXyz()`               | `createColorScore()`                         | For any ranking, scoring, or evaluative logic.                    |

---

## 🗂️ File & Directory Naming

— Use `kebab-case` for all filenames and folders:  
  Example: `color-scheme.ts`, `css-vars/`

— Group related functionality together by domain:| `createXyz()`             |
  `createColorScore()`                         | For any ranking, scoring, or evaluative logic. |

---

## 🗂️ File & Directory Naming

- Use `kebab-case` for all filenames and folders:  
  Example: `color-scheme.ts`, `css-vars/`

- Group related functionality together by domain:
```

/palette/
create-palette.ts
get-palette-colors.ts

  ```

---

## 🧪 Testing

- Use **Vitest** for unit tests.
- Use **Playwright** and **Happy DOM** for integration and UI tests.
- Always colocate tests with the source file:
  ```

create-theme.ts
create-theme.test.ts

  ```

---

## ✅ Before You Open a PR

1. Run `bun test` and ensure everything passes.
2. Format your code with `biome` or `prettier`.
3. Ensure function and variable names follow the table above.
4. Add JSDoc for public exports.
5. Keep modules focused — one responsibility per file.

---

## 🙏 Thank You!

Thanks for helping make this project awesome. We appreciate your care and consistency. If you're unsure about something, just ask in the discussion or open a draft PR.

```