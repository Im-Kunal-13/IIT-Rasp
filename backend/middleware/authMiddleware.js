// Requiring JSONWEBTOKEN
const jwt = require("jsonwebtoken");
// Requiring Express Async Handler.
// Simple middleware for handling exceptions inside of async express routes and 
// passing them to your express error handlers
const asyncHandler = require("express-async-handler");
// importing the Admin Data Model Schema. 
const Admin = require("../models/adminModel");

// Creating the function that wil protect our routes. (Wrapping it inside the asyncHandler)
const protect = asyncHandler(async (req, res, next) => {
  // Initializing the token.
  let token;

  // Checking authorization in http headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Getting token from Header.
      token = req.headers.authorization.split(" ")[1];

      // Verify the token with the secret JWT.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from the token (It will first find the admin by the id and exculde the password.
      req.admin = await Admin.findById(decoded.id).select("-password");

      // Calling the next middleware in the chain.
      next();
    } catch (error) {
      // Consoling the error if caught any.
      console.log(error);
      // Sending respond status 401 (authorization error)
      res.status(401);
      // Throwing new Error accordingly.
      throw new Error("Not authorized");
    }
  }
  // Checking if token is not present at all. 
  if (!token) {
    // Sending respond status 401 (authorization error)
    res.status(401);
    // Throwing new Error accordingly.
    throw new Error("No token");
  }
});

// Exporting the function we created to protect the routes. 
module.exports = { protect };
