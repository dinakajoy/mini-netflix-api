const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'My_Secret_Token');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
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