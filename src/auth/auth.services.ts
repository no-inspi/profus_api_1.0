const { dbexport } = require('../utils/db');
// import { hashToken } from '../utils/hashToken';
const { hashToken } = require('../utils/hashToken');

export function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: any) {
  console.log(hashToken(refreshToken))
  return dbexport.refreshToken.create({
    data: {
      id_: jti,
      hashedToken: hashToken(refreshToken),
      userId: userId,
    },
  });
}

export function findRefreshTokenById(id_: any) {
  return dbexport.refreshToken.findUnique({
    where: {
      id_,
    },
  });
}

export function deleteRefreshToken(id_: any) {
  return dbexport.refreshToken.update({
    where: {
      id_,
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
