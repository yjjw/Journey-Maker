const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const APPError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign({ id: id}, process.env.JWT_SECRET);
}

exports.signUp = catchAsync(async(req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  })
});

exports.login = catchAsync(async(req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // 1) check if email and password exists
  if (!email || !password) {
    return next(new APPError('Please provide email and password!', 400));
  }
  // 2) check if users exists && password is correct
  const user = await User.findOne({email: email}).select('+password');

  if(!user || !(await user.correctPassword(password, user.password))) {
    return next(new APPError('Incorrect email or password', 401));
  }
  // 3) if everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});
