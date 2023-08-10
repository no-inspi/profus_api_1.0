"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeTokens = exports.deleteRefreshToken = exports.findRefreshTokenById = exports.addRefreshTokenToWhitelist = void 0;
const { dbexport } = require('../utils/db');
// import { hashToken } from '../utils/hashToken';
const { hashToken } = require('../utils/hashToken');
function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
    console.log(hashToken(refreshToken));
    return dbexport.refreshToken.create({
        data: {
            id_: jti,
            hashedToken: hashToken(refreshToken),
            userId: userId,
        },
    });
}
exports.addRefreshTokenToWhitelist = addRefreshTokenToWhitelist;
function findRefreshTokenById(id_) {
    return dbexport.refreshToken.findUnique({
        where: {
            id_,
        },
    });
}
exports.findRefreshTokenById = findRefreshTokenById;
function deleteRefreshToken(id_) {
    return dbexport.refreshToken.update({
        where: {
            id_,
        },
        data: {
            revoked: true
        }
    });
}
exports.deleteRefreshToken = deleteRefreshToken;
function revokeTokens(userId) {
    return dbexport.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}
exports.revokeTokens = revokeTokens;
//# sourceMappingURL=auth.services.js.map