const asyncHandler = require("express-async-handler");
const { findByIdAndDelete } = require("../goalsModel/goalModel");
const Goal = require("../goalsModel/goalModel");

//@desc Get goals
//@route GET api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }).sort({
    updatedAt: "desc",
  });

  res.status(200).json(goals);
});
//@desc create goals
//@route POST api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    res.status(400);
    throw new Error("body is not found ");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
//@desc update  goals
//@route put api/goals
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (goal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("user not authorized  ");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text,
    },
    { new: true }
  );
  res.status(200).json(updatedGoal);
});
//@desc delete goals
//@route DELETE api/goals
//@access Private
const DeleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (goal.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("user not authorized  ");
  }
  await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "delete  Goals ", id: req.params.id });
});

module.exports = {
  getGoals,
  updateGoal,
  setGoal,
  DeleteGoal,
};
