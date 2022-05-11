const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const admin = require("../models/adminModel");

// @Description -> Get goals.
// @Route -> GET /api/goals
// @Acess -> Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ userId: req.admin.id });

  res.status(200).send(goals);
});

// @Description -> Set goals.
// @Route -> POST /api/goals
// @Acess -> Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field.");
  }

  const goal = await Goal.create({
    text: req.body.text,
    userId: req.admin.id,
  });

  res.status(200).send(goal);
});
// @Description -> Update goal.
// @Route -> PUT /api/goals/:id
// @Acess -> Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const admin = await admin.findById(req.admin.id);

  // Check for admin.
  if (!admin) {
    res.status(401);
    throw new Error("admin not found");
  }

  // Make sure the logged in admin matches the goal admin. 
  if(goal.userId.toString() !== admin.id) {
      res.status(401)
      throw new Error("admin not authorized.")
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    // mentioning new: true will just create the goal if doesn't exist already.
    new: true,
  });

  res.status(200).send(updatedGoal);
});
// @Description -> Delete goal.
// @Route -> DELETE /api/goals/:id
// @Acess -> Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    throw new Error("Goal not present.");
  }
  const admin = await admin.findById(req.admin.id);

  // Check for admin.
  if (!admin) {
    res.status(401);
    throw new Error("admin not found");
  }

  // Make sure the logged in admin matches the goal admin. 
  if(goal.userId.toString() !== admin.id) {
      res.status(401)
      throw new Error("admin not authorized")
  }

  await goal.remove();

  res.status(200).send({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
