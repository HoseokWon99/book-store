const { signOut } = require("../service");
const { pipeline } = require("../../common");

const signOutHandler = async (req, res, next) => {

    try {
        const authorization = req.headers.authorization;
        console.debug(authorization);

        if (authorization && typeof authorization === 'string') {
            const token = authorization.split(' ')[1];
            console.debug(token);
            token && await signOut(token);
            res.clearCookie("REFRESH_TOKEN", {httpOnly: true});
        }

        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
}

module.exports = pipeline(signOutHandler);