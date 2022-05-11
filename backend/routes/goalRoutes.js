// Requiring Express. 
const express = require("express");
// Taking Router from express.
const router = express.Router();
// Importing the funcitons related to goal routes from goal Controller. 
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
// importing the function we created to protect routes. 
const {protect} = require("../middleware/authMiddleware")

// applyting different functions according to different routes. Note that unlike user in this case, we are protecting all the routes. 
router.route("/").get(protect, getGoals).post(protect, setGoal) // Private

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal) // Private

// Exporting the router to whic we have made changes to.
module.exports = router;
