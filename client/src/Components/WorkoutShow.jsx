import moment from "moment";
import React from "react";

const WorkoutList = ({ workouts }) => {
  return (
    <>
      <h2 className="text-white abs-center">All Workouts</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4 my-5 overflow-x-hidden">
        {workouts.map((workout) => (
          <div class="card-group max mx-auto ">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  Date: {moment(workout.Date).format("YYYY-MM-DD")}
                </h5>
                <p class="card-text">Muscle: {workout.muscle}</p>
                <p className="card-text">
                  Duration: {workout.duration} minutes
                </p>
                <p className="card-text">Sets: {workout.sets}</p>
                <p class="card-text">
                  <small class="text-body-secondary">Good Progress</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkoutList;
