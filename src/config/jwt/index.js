exports.createToken = require("./create-token");
exports.verifyToken = require("./verifty-token");
exports.ACCESS_EXPIRES = Number(process.env.JWT_ACCESS_TOKEN_DURATION);
exports.REFRESH_EXPIRES = Number(process.env.JWT_REFRESH_TOKEN_DURATION);