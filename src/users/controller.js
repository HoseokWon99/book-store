const { pipeline, validationHandler, body } = require("../common");
const schema  = require("./schema/sign-up");
const usersService = require("./service");


const signUpHandler = async (req, res) => {
    await usersService.createUser(req.body);
    res.sendStatus(201);
}

exports.signUp = pipeline(
    validationHandler([body(schema)]),
    signUpHandler
);