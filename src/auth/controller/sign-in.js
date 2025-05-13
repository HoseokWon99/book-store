const { signIn } = require("../service");
const SignInSchema = require("../schema/sign-in");
const { pipeline, body, validationHandler } = require("../../common");


const signInHandler = async (req, res, next) => {

    console.log(req.body);

    try {
        const { accessToken, refreshToken }
            = await signIn(req.body);

        res.cookie("REFRESH_TOKEN", refreshToken, {
                httpOnly: true,
                maxAge: Number(process.env.JWT_REFRESH_TOKEN_DURATION)*1000
        });

        res.status(201).send({ accessToken });
    }
    catch(error) {
        next(error);
    }

}

module.exports = pipeline(
    validationHandler([body(SignInSchema)]),
    signInHandler
);