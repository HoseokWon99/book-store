const { forgetPassword } = require("../service");
const { pipeline, validationHandler, body } = require("../../../common");
const schema = require("../schema/forget-password");
const StatusCodes = require("http-status-codes");

const forgetPasswordHandler = async (req, res) => {
  const { email } = req.body;
  const token = await forgetPassword(email);
  res.status(StatusCodes.ACCEPTED).send({ token });
};

module.exports = pipeline(
    validationHandler([body(schema)]),
    forgetPasswordHandler
);