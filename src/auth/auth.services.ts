const { db } = require('../utils/db');
// import { hashToken } from '../utils/hashToken';
const { hashToken } = require('../utils/hashToken');

export function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: any) {
  console.log(hashToken(refreshToken))
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId: userId,
    },
  });
}

export function findRefreshTokenById(id: any) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

export function deleteRefreshToken(id: any) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

export function revokeTokens(userId: any) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}
