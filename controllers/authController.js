const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');

exports.signUp = catchAsync(async(req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  })
});
