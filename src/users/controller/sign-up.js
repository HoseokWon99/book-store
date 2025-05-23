const { createUser } = require("../service");
const { pipeline, validationHandler, body } = require("../../common");
const schema = require("../schema/sign-up");
const StatusCodes = require("http-status-codes");

const signUpHandler = async (req, res) => {
    await createUser(req.body);
    res.sendStatus(StatusCodes.CREATED);
}

exports.signUp = pipeline(
    validationHandler([body(schema)]),
    signUpHandler
);