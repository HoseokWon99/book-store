const { resetPassword } = require("../service");
const { pipeline, validationHandler, body, params } = require("../../../common");
const schema = require("../schema/reset-password");
const StatusCodes = require("http-status-codes");

const resetPasswordHandler = async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;
    await resetPassword({ token, password });
    res.sendStatus(StatusCodes.OK);
};

module.exports = pipeline(
    validationHandler([params(schema.params), body(schema.body)]),
    resetPasswordHandler
);