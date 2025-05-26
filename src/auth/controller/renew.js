const { renew } = require("../service");
const { pipeline } = require("../../common");
const StatusCodes = require("http-status-codes");

const renewHandler = async (req, res) => {
    const accessToken = renew(req.user);
    res.status(StatusCodes.CREATED).send({ accessToken });
};

module.exports = pipeline(renewHandler);