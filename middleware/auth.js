const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      res.status(401).json({
        error: 'No token please!'
      });
    } 
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    if (!req.body.userId || req.body.userId !== userId) {
      res.status(401).json({
        error: 'Invalid Login Credentials!'
      });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: 'Invalid Request!'
    });
  }
};