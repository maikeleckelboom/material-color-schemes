import { beforeAll, describe, expect, it } from 'vitest';
import { createTheme } from '../src';

beforeAll(async () => {});

describe('createTheme', () => {
  it('should accept an direct argument', () => {
    const theme = createTheme(0xff00ff);
    expect(theme).toBeDefined();
  });

  it('should accept an options object with seed color', () => {
    const theme = createTheme({ seedColor: 0xff00ff });
    expect(theme).toBeDefined();
  });

  it('should accept an options object with primary color', () => {
    const theme = createTheme({ primary: 0xff00ff });
    expect(theme).toBeDefined();
  });
});
