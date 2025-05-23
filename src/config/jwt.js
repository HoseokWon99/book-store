const jwt = require('jsonwebtoken');

/**
 *
 * @param {string} email
 * @param {number} ex toke expiration, the unit is second.
 * @returns {string}
 */
function createToken(email, ex) {
    return jwt.sign(
        { email: email },
        process.env.JWT_SECRET,
        { expiresIn: ex }
    );
}

/**
 *
 * @async
 * @param {string} token
 * @returns {Promise<*>}
 */
async function verifyToken(token) {
    try {
        return  jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (e) {
        console.error(e);
        return {};
    }
}

module.exports = { createToken, verifyToken };