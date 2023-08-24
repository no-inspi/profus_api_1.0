const express = require('express');
const { db } = require('../utils/db');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
import {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById,
  createUser,
  findUserByPseudo,
  getLastIdUser
} from '../user/users.services';

const { generateTokens } = require('../utils/jwt');
// import {generateAccessToken, generateRefreshToken, generateTokens} from '../utils/jwt';
const {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
} = require('./auth.services');
const { hashToken } = require('../utils/hashToken');
import * as crypto from 'crypto';

const router = express.Router();

router.post('/register', async (req: any, res: any, next: any) => {
  console.log(req.body)
  try {
    const { email, password, passwordConfirm, pseudo } = req.body;

    if (!email || !password || !passwordConfirm) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    if (passwordConfirm != password) {
      res.status(400);
      throw new Error('Password are different');
    }

    const existingUser = await findUserByEmail(email);
    console.log(existingUser)
    if (existingUser[0]) {
      res.status(400);
      throw new Error('Email already in use.');
    }

    const lastId = await getLastIdUser()
    console.log(lastId)
    let id_ = lastId[0].id_ + 1
    const user = await createUser({ email, password, pseudo, id_});
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id_ });

    res.json({
      accessToken,
      refreshToken
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req: any, res: any, next: any) => {
  try {
    const { pseudo, password } = req.body;
    if (!pseudo || !password) {
      res.status(400);
      throw new Error('You must provide an pseudo and a password.');
    }

    const existingUser = await findUserByPseudo(pseudo);
    console.log("existing user: ",existingUser[0])

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const senderPassword = crypto.createHash('sha256').update(password).digest('hex');

    // const validPassword = await bcrypt.compare(password, existingUser.password);
    // const validPassword = "test"
    console.log("test:",senderPassword, existingUser[0].password)
    if (existingUser[0].password != senderPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser[0], jti);
    // console.log(accessToken, refreshToken)

    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser[0].id_ });

    res.json({
      accessToken,
      refreshToken
    });
  } catch (err) {
    next(err);
  }
});

router.post('/refreshToken', async (req: any, res: any, next: any) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    next(err);
  }
});

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
