import * as crypto from 'crypto';

export function hashToken(token: any) {
  return crypto.createHash('sha512').update(token).digest('hex');
}

// module.exports = { hashToken };