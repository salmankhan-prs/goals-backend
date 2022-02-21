const express = require("express");
const {
  getGoals,
  setGoal,
  updateGoal,
  DeleteGoal,
} = require("../controller/goalsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getGoals);

router.post("/", protect, setGoal);

router.put("/:id", protect, updateGoal);

router.delete("/:id", protect, DeleteGoal);
module.exports = router;
