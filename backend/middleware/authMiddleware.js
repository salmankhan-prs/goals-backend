const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../goalsModel/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log("Tokn", token);
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      console.log("token", token);
      res.status(200);
      throw new Error("Not Authorized ");
    }
  }
  if (!token) {
    res.status(200);
    throw new Error("Not Authorized no token  ");
  }
});
module.exports = { protect };
