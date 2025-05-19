/**
 *
 * @param {string} pattern
 * @returns {RegExp}
 */
function arrayOf(pattern) {
    return new RegExp(`^${pattern}(,${pattern})*$`);
}

/**
 *
 * @param {string} pattern1
 * @param {string} pattern2
 * @returns {RegExp}
 */
function pairOf(pattern1, pattern2) {
    return new RegExp(`^(${pattern1}),(${pattern2})$`);
}

/**
 *
 * @param {string} pattern
 * @returns {RegExp}
 */
function rangeOf(pattern) {
    return pairOf(pattern, pattern);
}

module.exports = { arrayOf, pairOf, rangeOf };


