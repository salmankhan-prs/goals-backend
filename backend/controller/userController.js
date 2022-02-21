const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../goalsModel/userModel");
//@desc register a user
//@route POST /api/user
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all  felids  ");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    email,
    password: hashPassword,
    name,
  });

  user
    ? res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    : res.status(400).json("Invalid data ");
});
//@desc login  a user
//@route POST /api/user
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      token: generateToken(user._id),
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User alreemail and password not matched t");
  }
});
//@desc register a user
//@route POST /api/users/me
//@access public
const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
};
module.exports = { registerUser, loginUser, getMe };
