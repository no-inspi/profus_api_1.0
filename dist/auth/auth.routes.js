"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { db } = require('../utils/db');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const users_services_1 = require("../user/users.services");
const { generateTokens } = require('../utils/jwt');
// import {generateAccessToken, generateRefreshToken, generateTokens} from '../utils/jwt';
const { addRefreshTokenToWhitelist, findRefreshTokenById, deleteRefreshToken, revokeTokens } = require('./auth.services');
const { hashToken } = require('../utils/hashToken');
const crypto = __importStar(require("crypto"));
const router = express.Router();
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, pseudo } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error('You must provide an email and a password.');
        }
        const existingUser = yield (0, users_services_1.findUserByEmail)(email);
        console.log(existingUser);
        if (existingUser[0]) {
            res.status(400);
            throw new Error('Email already in use.');
        }
        const lastId = yield (0, users_services_1.getLastIdUser)();
        console.log(lastId);
        let id_ = lastId[0].id_ + 1;
        const user = yield (0, users_services_1.createUser)({ email, password, pseudo, id_ });
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        yield addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id_ });
        res.json({
            accessToken,
            refreshToken
        });
    }
    catch (err) {
        next(err);
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pseudo, password } = req.body;
        if (!pseudo || !password) {
            res.status(400);
            throw new Error('You must provide an pseudo and a password.');
        }
        const existingUser = yield (0, users_services_1.findUserByPseudo)(pseudo);
        console.log("existing user: ", existingUser[0]);
        if (!existingUser) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }
        const senderPassword = crypto.createHash('sha256').update(password).digest('hex');
        // const validPassword = await bcrypt.compare(password, existingUser.password);
        // const validPassword = "test"
        console.log("test:", senderPassword, existingUser[0].password);
        if (existingUser[0].password != senderPassword) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser[0], jti);
        // console.log(accessToken, refreshToken)
        yield addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser[0].id_ });
        res.json({
            accessToken,
            refreshToken
        });
    }
    catch (err) {
        next(err);
    }
}));
router.post('/refreshToken', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken = yield findRefreshTokenById(payload.jti);
        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error('Unauthorized');
        }
        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401);
            throw new Error('Unauthorized');
        }
        const user = yield (0, users_services_1.findUserById)(payload.userId);
        if (!user) {
            res.status(401);
            throw new Error('Unauthorized');
        }
        yield deleteRefreshToken(savedRefreshToken.id);
        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        yield addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });
        res.json({
            accessToken,
            refreshToken: newRefreshToken
        });
    }
    catch (err) {
        next(err);
    }
}));
// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
// router.post('/revokeRefreshTokens', async (req, res, next) => {
//   try {
//     const { userId } = req.body;
//     await revokeTokens(userId);
//     res.json({ message: `Tokens revoked for user with id #${userId}` });
//   } catch (err) {
//     next(err);
//   }
// });
module.exports = router;
//# sourceMappingURL=auth.routes.js.map