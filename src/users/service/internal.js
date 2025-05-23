const { createHash } = require("crypto");

/**
 *
 * @template {{}} T
 * @param {T} dto
 * @returns {T}
 */
function encryptUser(dto) {

    if (dto.password && typeof dto.password === 'string') {
        dto.password = createHash("sha256")
            .update(dto.password).digest("base64")
    }

    return dto;
}

module.exports = { encryptUser };