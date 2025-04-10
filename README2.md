## Usage

Here’s how to use the library step-by-step. Each section includes a simple example you can try.

### Creating a Theme

A **theme** in Material Design is like a blueprint for your app’s colors. You start with a "source color" (any color you like), and the library creates a full set of matching colors.

```typescript
import { createTheme } from 'material-color-schemes';

// Create a theme with a red source color
const theme = createTheme('#CD3232');
```

You can also tweak the theme with options, like making it more vibrant or adjusting contrast:

```typescript
import { createTheme, Variant, ContrastLevel } from 'material-color-schemes';

const theme = createTheme('#CD3232', {
  variant: Variant.VIBRANT, // Makes colors pop
  contrastLevel: ContrastLevel.HIGH, // Increases contrast for readability
});
```

### Generating a Color Scheme

A **color scheme** is a set of colors based on your theme, ready to use in your app (e.g., for text, buttons, or backgrounds). You can make one for light mode, dark mode, or both.

```typescript
import { createColorScheme } from 'material-color-schemes';

// Generate a dark mode color scheme
const colorScheme = createColorScheme(theme, {
  dark: true, // Dark mode
  brightnessVariants: true, // Adds light/dark versions of each color
});
```

This gives you colors like `primary`, `onPrimary`, `background`, etc. If you set `brightnessVariants: true`, you’ll also get `primaryLight` and `primaryDark` for extra flexibility.


### Using Colors in CSS

You can turn your color scheme into CSS variables to style your website:

```typescript
import { formatCssVarMapping } from 'material-color-schemes';

const cssVars = formatCssVarMapping(colorScheme, ':root');
console.log(cssVars);
// Outputs: ":root { --primary: #cd3232; --on-primary: #ffffff; ... }"
```

Then, in your CSS file:

```css
:root {
  --primary: #cd3232;
  --on-primary: #ffffff;
}

button {
  background-color: var(--primary);
  color: var(--on-primary);
}
```
