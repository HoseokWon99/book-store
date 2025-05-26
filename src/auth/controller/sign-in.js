const { signIn } = require("../service");
const { pipeline, body, validationHandler } = require("../../common");
const schema = require("../schema/sign-in");
const StatusCodes = require("http-status-codes");


const signInHandler = async (req, res) => {

    const { accessToken, refreshToken }
        = await signIn(req.body);

    res.cookie("REFRESH_TOKEN", refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.JWT_REFRESH_TOKEN_DURATION)
    });

    res.status(StatusCodes.CREATED).send({ accessToken });
}

module.exports = pipeline(
    validationHandler([body(schema)]),
    signInHandler
);