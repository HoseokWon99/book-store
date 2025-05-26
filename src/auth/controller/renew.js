const { renew } = require("../service");
const { pipeline } = require("../../common");
const StatusCodes = require("http-status-codes");

const renewHandler = async (req, res) => {
    const refreshToken = req.cookies["REFRESH_TOKEN"];
    if (!refreshToken) return res.sendStatus(StatusCodes.FORBIDDEN);
    const accessToken = await renew(refreshToken);
    res.status(StatusCodes.CREATED).send({ accessToken });
};

module.exports = pipeline(renewHandler);