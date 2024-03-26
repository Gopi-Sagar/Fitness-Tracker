const {
  createWorkout,
  getAllWorkouts,
} = require("../Controllers/WorkoutController");
const router = require("express").Router();

router.post("/", createWorkout);
router.get("/", getAllWorkouts);

module.exports = router;
