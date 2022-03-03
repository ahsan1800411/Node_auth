const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../utils/ErrorHandler');

exports.authenticatedUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ErrorHandler('Unauthorized user', 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
};
