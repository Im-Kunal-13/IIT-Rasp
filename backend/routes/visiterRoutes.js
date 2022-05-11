// Requiring Express.
const express = require("express");
// Taking Router from express.
const router = express.Router();
// Importing the funcitons related to visiter routes from visiter Controller.
const {
  setVisister,
  getVisiters,
} = require("../controllers/visiterController");
// importing the function we created to protect routes.
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getVisiters).post(protect, setVisister); // Private

// Exporting the router to whic we have made changes to.
module.exports = router;
