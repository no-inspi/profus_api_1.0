const jwt = require('jsonwebtoken');

function notFound(req: any, res: any, next: any) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err: any, req: any, res: any, next: any) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

export function isAuthenticated(req: any, res: any, next: any) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401);
    throw new Error('🚫 Un-Authorized 🚫');
  }

  try {
    // const token = authorization
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err: any) {
    res.status(401);
    if (err.name === 'TokenExpiredError') {
      throw new Error(err.name);
    }
    console.log(err)
    throw new Error('🚫 Un-Authorized 🚫 test');
  }

  return next();
}

module.exports = {
  notFound,
  errorHandler,
  isAuthenticated
};
