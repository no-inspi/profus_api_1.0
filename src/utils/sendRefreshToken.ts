function sendRefreshToken(res: any, token: any) {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      sameSite: true,
      path: '/api/v1/auth',
    });
  }
  
  module.exports = { sendRefreshToken };