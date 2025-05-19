const { readFileSync } = require("fs");
const { join } = require('path');

/**
 *
 * @param {string} certDir
 */
exports.makeSSLOptions = (certDir) => ({
    key: readFileSync(join(certDir, "key.pem")),
    cert: readFileSync(join(certDir, "cert.pem"))
});
