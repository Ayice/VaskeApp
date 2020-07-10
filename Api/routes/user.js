const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const { validateNewUser } = require('../validation');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.send('<h1>User route</h1>');
});

router.post('/create', async (req, res) => {
  // Validate the request
  const { error } = validateNewUser(req.body);
  if (error) {
    return res.status(400).json({
      status: 'Error',
      msg: error.details[0].message,
    });
  }
  // Check if the Email is already in use
  const emailChecker = await User.findOne({ email: req.body.email });
  if (emailChecker)
    return res.status(400).json({
      status: 'Error',
      msg: `Emailen: ${req.body.email}, findes allerede`,
    });

  // Hash Passwords
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create the model we are insterting
  const newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    floor: req.body.floor,
    lejlighed: req.body.appartment,
  });

  // Save the model to the database
  try {
    const saveUser = await newUser.save();
    res.status(200).json({
      status: 'Success',
      msg: 'Bruger oprettet',
      data: saveUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      msg: 'Brugernavnet findes allerede!',
    });
  }
});

router.get('/:id', async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  if (!user)
    return res.status(400).json({
      status: 'Error',
      msg: `Brugeren blev ikke fundet`,
    });

  let newUser = { ...user._doc };
  delete newUser['password'];
  return res.status(200).json({
    status: 'Success',
    user: newUser,
  });
});

router.post('/login', async (req, res) => {
  // Check email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      status: 'Error',
      msg: `Emailen: ${req.body.email}, findes ikke i databasen`,
    });

  // Compare the passwords
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ status: 'Error', msg: 'Email og password matcher ikke ' });

  // Create Json web token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  let newUser = { ...user._doc };
  delete newUser['password'];
  res.header('auth-token', token).json({
    status: 'Success',
    msg: 'Du er nu logget ind',
    token: token,
    user: newUser,
  });
});

module.exports = router;
