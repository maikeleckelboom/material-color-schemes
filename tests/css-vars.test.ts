import { describe, expect, it } from 'vitest';
import { createCssVarMap, serializeCssVarMap, createCssVariables } from '../src';

describe('CSS Variables', () => {
  it('should create CSS variable map from color scheme', () => {
    const colorScheme = {
      primary: 0xffff5733,
      onPrimary: 0xffffffff,
    };

    const cssVarMap = createCssVarMap(colorScheme);
    expect(cssVarMap).toEqual({
      '--primary': '#ff5733',
      '--on-primary': '#ffffff',
    });
  });

  it('should serialize CSS variable map without selector', () => {
    const cssVarMap = {
      '--primary': '#ff5733',
      '--on-primary': '#ffffff',
    };

    const cssString = serializeCssVarMap(cssVarMap);
    expect(cssString).toBe('--primary: #ff5733; --on-primary: #ffffff;');
  });

  it('should serialize CSS variable map with selector', () => {
    const cssVarMap = {
      '--primary': '#ff5733',
    };

    const cssString = serializeCssVarMap(cssVarMap, ':root');
    expect(cssString).toBe(':root { --primary: #ff5733; }');
  });

  // This could be a snapshot test
  it('should create complete CSS variables string', () => {
    const colorScheme = {
      primary: 0xffff5733,
      onPrimary: 0xffffffff,
    };

    const css = createCssVariables(colorScheme);
    expect(css).toMatch(/--primary: #ff5733;/);
    expect(css).toMatch(/--on-primary: #ffffff;/);
  });
});
