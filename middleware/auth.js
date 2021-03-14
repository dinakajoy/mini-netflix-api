const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    if (!req.body.userId || req.body.userId !== userId) {
      throw 'Invalid Login Credentials';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid Request!')
    });
  }
};