/**
 *
 * @param {Array<"NONE" | "USER" | "ADMIN"> }roles
 * @returns {import("../../common/typedef").Handler}
 */
module.exports = function (roles){
    const allowed = new Set(roles);

    return function(req, res, next) {
        const role = req.user ? req.user.role : "NONE";
        allowed.has(role) ? next() : res.sendStatus(403);
    };
}