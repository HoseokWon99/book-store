const { signOut } = require("../service");
const { pipeline } = require("../../common");
const StatusCodes = require("http-status-codes")

const extractTokenHandler = async (req, res, next) => {
    const authorization = req.headers.authorization || "";

    if (authorization.startsWith("bearer ")) {
        req.token = authorization.replace("bearer ", '');
        return next();
    }

    res.sendStatus(StatusCodes.OK);
}

const signOutHandler = async (req, res) => {
    const token = req.token;
    await signOut(token);
    res.clearCookie("REFRESH_TOKEN", { httpOnly: true });
    res.sendStatus(StatusCodes.OK);
}

module.exports = pipeline(
    extractTokenHandler,
    signOutHandler
);