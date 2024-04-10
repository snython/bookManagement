const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a user
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name: name, email, password } = req.body;

  // checks if the variable name, email and password is falsy. 
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  // check if user exist
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password is " + hashedPassword);
  const user = await User.create({
    name: name,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user} `);
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({
    message: "register the user ",
  });
});
//@desc Login a user
// @route POST /api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  // check if the user exist and get the user details
  const user = await User.findOne({ email });
  // Compare password with hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log('login ok');
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Get current user info
// @route GET /api/users/current
// @access private
const getCurrentUser = asyncHandler(async (req, res) => {
  console.log('current user ', req.user);
  res.json(req.user);
});

module.exports = { registerUser, loginUser, getCurrentUser };
