const { dbexport } = require('../utils/db');
// import { hashToken } from '../utils/hashToken';
const { hashToken } = require('../utils/hashToken');

export function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: any) {
  console.log(hashToken(refreshToken))
  return dbexport.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId: userId,
    },
  });
}

export function findRefreshTokenById(id: any) {
  return dbexport.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

export function deleteRefreshToken(id: any) {
  return dbexport.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

export function revokeTokens(userId: any) {
  return dbexport.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}
