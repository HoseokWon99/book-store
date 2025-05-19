/**
 *
 * @template {Object} T
 * @param {T} a
 * @param {T} b
 * @returns {boolean}
 */
function equals(a, b) {
    if (a === b) return true;
    if (!a || !b) return false;

    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;

    for (const key of keys) {
        if (!Object.hasOwn(b, key)) return false;

        if (__isPrimitive(a[key])) {
            if (a[key] !== b[key]) return false;
            continue;
        }

        if (!equals(a[key], b[key])) return false;
    }

    return true;
}

/**
 *
 * @param {*} x
 * @returns {boolean}
 * @private
 */
function __isPrimitive(x) {
    return typeof x === 'string'
        || typeof x === 'number'
        || typeof x === 'bigint'
        || typeof x === 'boolean';
}

module.exports = { equals };