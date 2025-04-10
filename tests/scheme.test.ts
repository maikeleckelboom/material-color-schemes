import {describe, expect, it} from 'vitest';
import {createScheme} from '../src';

describe('createScheme', () => {
    it('should accept a source color', () => {
        const scheme = createScheme({sourceColor: 0xff00ff});
        expect(scheme).toBeDefined();
    });

    it('should accept an options object with source color', () => {
        const scheme = createScheme({sourceColor: 0xff00ff});
        expect(scheme).toBeDefined();
    });

    it('should accept an options object with primary color', () => {
        const scheme = createScheme({primary: 0xff00ff});
        expect(scheme).toBeDefined();
    });
});