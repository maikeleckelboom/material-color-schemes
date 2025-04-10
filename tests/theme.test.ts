import { describe, expect, it } from 'vitest';
import { createTheme } from '../src';

describe('createTheme', () => {
  it('should accept an direct argument', () => {
    const theme = createTheme(0xff00ff);
    expect(theme).toBeDefined();
  });

  it('should accept an options object with source color', () => {
    const theme = createTheme({ sourceColor: 0xff00ff });
    expect(theme).toBeDefined();
  });

  it('should accept an options object with primary color', () => {
    const theme = createTheme({ primary: 0xff00ff });
    expect(theme).toBeDefined();
  });
});
