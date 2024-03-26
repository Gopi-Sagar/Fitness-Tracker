const Workout = require("../Models/WorkoutModel");

// Create a new workout session (with validation)
module.exports.createWorkout = async (req, res) => {
  try {
    const { date, muscle, duration, sets } = req.body;
    // Check for empty request body
    if (!req.body) {
      return res.status(400).json({
        status: "fail",
        message: "No workout data provided",
      });
    }

    // Create new workout document
    const newWorkout = await Workout.create({ date, muscle, duration, sets });

    res.status(201).json({
      message: "That was a great Session. Good Job !",
      status: "success",
      data: {
        workout: newWorkout,
      },
    });
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({
      status: "fail",
      message: "Error creating workout", // Generic error message for the frontend
    });
  }
};

// Get all workout sessions
module.exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json({
      status: "success",
      results: workouts.length,
      data: {
        workouts,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
