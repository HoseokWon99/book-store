const normalizedPath = require("./normalized-path");
const extractToken = require("./extract-token");
const didSignIn = require("./did-sign-in");
const whitelist = require("./whitelist");
const { verifyToken } = require("../jwt");

module.exports = async (req, res, next) => {

    try {
        const token = extractToken(req);
        await didSignIn(token);
        const { id, email } = verifyToken(token);
        req.user = { id, email };
        next();
    }
    catch (error) {
        whitelist.has(normalizedPath(req))
            ? next() : next(error);
    }

};




