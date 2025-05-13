const passport = require("passport");
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const usersService = require("../../users/service");

const __options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const __verify = async (payload, done) => {
    await usersService.getUserBy({ email: payload.email })
        .then(user => done(null, user))
        .catch(err => done(err, false));
};

passport.use(new JwtStrategy(__options, __verify));
/**@type {import("../../common/typedef").Handler} */
module.exports = passport.authenticate("jwt", { session: false });