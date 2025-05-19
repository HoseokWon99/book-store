const { signOut } = require("../service");
const { pipeline } = require("../../common");

const extractTokenHandler = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) return res.sendStatus(200);
    if (typeof authorization !== "string") return res.sendStatus(200);
    if (!authorization.startsWith("bearer ")) return res.sendStatus(200);

    req.token = authorization.replace("bearer ", '');
    next();
}

const signOutHandler = async (req, res) => {
    const token = req.token;
    await signOut(token);
    res.clearCookie("REFRESH_TOKEN", { httpOnly: true });
    res.sendStatus(200);
}

module.exports = pipeline(
    extractTokenHandler,
    signOutHandler
);