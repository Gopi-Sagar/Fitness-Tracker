const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Date of Session Required"],
  },
  muscle: {
    type: String,
    required: [true, "Name of Session Required"],
  },
  duration: {
    type: String,
    required: [true, "Enter Duration of workout"],
  },
  sets: {
    type: String,
    required: [true, "Enter the Number of Sets"],
  },
});

module.exports = mongoose.model("workout", workoutSchema);
