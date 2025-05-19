const { equals } = require('./equals');

describe('equals', () => {
    test('returns true for same object reference', () => {
        const obj = { a: 1 };
        expect(equals(obj, obj)).toBe(true);
    });

    test('returns true for deeply equal objects', () => {
        const a = { x: 1, y: { z: 2 } };
        const b = { x: 1, y: { z: 2 } };
        expect(equals(a, b)).toBe(true);
    });

    test('returns false for different structures', () => {
        const a = { x: 1, y: 2 };
        const b = { x: 1 };
        expect(equals(a, b)).toBe(false);
    });

    test('returns false for different primitive values', () => {
        expect(equals({ x: 1 }, { x: 2 })).toBe(false);
    });

    test('returns false for missing key in one object', () => {
        expect(equals({ a: 1 }, {})).toBe(false);
    });

    test('returns false for null inputs', () => {
        expect(equals(null, { x: 1 })).toBe(false);
        expect(equals({ x: 1 }, null)).toBe(false);
        expect(equals(null, null)).toBe(true);
    });

    test('returns false for different types', () => {
        expect(equals({ x: 1 }, 5)).toBe(false);
    });

    test('handles deeply nested inequality', () => {
        const a = { a: { b: { c: 1 } } };
        const b = { a: { b: { c: 2 } } };
        expect(equals(a, b)).toBe(false);
    });
});