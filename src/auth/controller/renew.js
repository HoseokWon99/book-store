const { renew } = require("../service");
const { pipeline } = require("../../common");

const renewHandler = async (req, res, next) => {

    try {
        const refreshToken = req.cookies["REFRESH_TOKEN"];
        if (!refreshToken) return res.sendStatus(403);
        res.status(200).send({ accessToken: await renew(refreshToken) });
    }
    catch (error) {
        next(error);
    }

};

module.exports = pipeline(renewHandler);