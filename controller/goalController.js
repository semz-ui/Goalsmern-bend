const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// desc Get goals
// route Get api/goals
//access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// desc Post goals
// route Post api/goals
//access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text to input");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
// desc Update goals
// route Put api/goals/:id
//access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Make sure user is owner of goal
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Making sure user is owner of goal
  if (goal.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// desc get single goal
// route Get api/goals/:id
//access Private
const singleGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Make sure user is owner of goal
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Making sure user is owner of goal
  if (goal.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(goal);
});

// desc Delete goals
// route Delete api/goals/:id
//access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // get single goal by id

  // Make sure user is owner of goal
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Making sure user is owner of goal
  if (goal.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Goal deleted" });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  singleGoal,
};
