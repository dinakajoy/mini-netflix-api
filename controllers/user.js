const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  bcrypt.hash(req.body.password, salt).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    user.save().then(() => {
      res.status(201).json({
        message: 'User added successfully!'
      });
    }).catch((error) => {
      res.status(500).json({
        error: error
      });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: 'User not found!'
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, valid) => {
          if (!valid) {
            return res.status(401).json({
              error: 'Incorrect password!'
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            process.env.TOKEN
          );
          res.status(200).json({
            userId: user._id,
            name: user.name,
            token: token
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error
      });
    });
}