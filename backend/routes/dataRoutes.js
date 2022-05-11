// Requiring Express.
const express = require("express");
// Taking Router from express.
const router = express.Router();
// Importing the funcitons related to admin routes from admin Controller.
const {
  getData,
} = require("../controllers/dataController");
// importing the function we created to protect routes.
const { protect } = require("../middleware/authMiddleware");

// applyting different functions according to different routes. Note we are only protecting private routes.
router.get("/",  getData); // Private


// Exporting the router to whic we have made changes to.
module.exports = router;