import { describe, expect, it } from 'vitest';
import { toArgb, toHex, toRgba } from '../src';

describe('Color Conversion', () => {
  it('should convert HEX to ARGB', () => {
    expect(toArgb('#FF5733')).toBe(0xffff5733);
  });

  it('should handle ARGB input in toArgb', () => {
    const argb = 0xffff5733;
    expect(toArgb(argb)).toBe(argb);
  });

  it('should convert ARGB to HEX', () => {
    expect(toHex(0xffff5733)).toBe('#ff5733');
  });

  it('should convert ARGB to RGBA', () => {
    expect(toRgba(0xffff5733)).toEqual({ r: 255, g: 87, b: 51, a: 255 });
  });
});
