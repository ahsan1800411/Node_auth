const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// register a user >>> Post Request >> /api/register;

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ErrorHandler('Please fill all the required fields', 400);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ErrorHandler('User already registred', 400);
  }

  const user = await User.create({ name, email, password });

  //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //     expiresIn: 360000,
  // });   1st way

  //   const token = user.createJWT();   2nd wayy

  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(201).cookie('token', token, options).json({
    success: true,
    user,
  });
});

// login a user   >>> Post Request >>>> /api/login

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ErrorHandler('Please fill all the required fields', 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorHandler('User not found', 400);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new ErrorHandler('Invalid Credentials', 400);
  }

  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(201).cookie('token', token, options).json({
    success: true,
    user,
  });
});
