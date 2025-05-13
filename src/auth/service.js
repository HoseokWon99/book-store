const usersService = require("../users/service");
const blacklist = require("../config/redis");
const { createToken, verifyToken } = require("../config/jwt");
const httpError = require("http-errors");

/**
 * @typedef {{ email: string; password: string; }} SignInDTO
 */

/**
 *
 * @async
 * @param {SignInDTO} dto
 * @returns {Promise<{accessToken: string, refreshToken: string}>}
 */
async function signIn(dto) {
   try {
       const { email } = await usersService.getUserBy(dto);

       return {
         accessToken: createToken(
             email,
             Number(process.env.JWT_ACCESS_TOKEN_DURATION)
         ),
         refreshToken: createToken(
             email,
             Number(process.env.JWT_REFRESH_TOKEN_DURATION)
         )
      };
   }
   catch (error) {
      if (error.status === 404) throw httpError(401);
      throw error;
   }
}

/**
 *
 * @async
 * @param {string} token
 * @returns {Promise<void>}
 */
async function signOut(token) {
   await blacklist.set(
       token,
       1,
       "EX",
       Number(process.env.JWT_ACCESS_TOKEN_DURATION)
   );
}

/**
 *
 * @async
 * @param {string} token
 * @returns {Promise<string>}
 */
async function renew(token) {

   try {
      return await verifyToken(token)
          .then(p => usersService.getUserBy({ email: p.email }))
          .then(user => user.email)
          .then(email => createToken(
              email,
              Number(process.env.JWT_ACCESS_TOKEN_DURATION)
          ));
   }
   catch (error) {
      console.error(error);
      if (error.status) throw httpError(403);
      throw error;
   }

}

module.exports = { signIn, signOut, renew };