// const asyncHandler = require("express-async-handler");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const validateToken = asyncHandler(async (req, res, next) => {
  let accessToken;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    accessToken = authHeader.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User Not authorized, token failed");
      }
      // req.user=decoded;
      // next();
      req.user = decoded.user;
      next();
    });
    if (!accessToken) {
      res.status(401);
      throw new Error("User Not authorized, token failed");
    }
  }
});
module.exports = validateToken;
