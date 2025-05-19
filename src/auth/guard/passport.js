const passport = require("passport");
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const usersService = require("../../users/service");
const blacklist = require("../../config/redis");

const __options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const __verify = async (payload, done) => {

    if (!payload.email || typeof payload.email !== 'string')
        return done(null, false);

    await usersService.getUserBy({ email: payload.email })
        .then(user => done(null, user))
        .catch(error => done(error, false));
};

passport.use(new JwtStrategy(__options, __verify));

/**@type {import("../../common/typedef").Handler} */
const __authenticate
    = passport.authenticate("jwt", { session: false });

/**@type {import("../../common/typedef").Handler} */
module.exports = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return next();

    if (await blacklist.get(authorization))
        return res.sendStatus(403);

    __authenticate(req, res, next);
};