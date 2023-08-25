"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jwt = require('jsonwebtoken');
function generateAccessToken(user) {
    return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '24h',
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user, jti) {
    return jwt.sign({
        userId: user.id,
        jti
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '24h',
    });
}
exports.generateRefreshToken = generateRefreshToken;
function generateTokens(user, jti) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);
    return {
        accessToken,
        refreshToken,
    };
}
exports.generateTokens = generateTokens;
//# sourceMappingURL=jwt.js.map