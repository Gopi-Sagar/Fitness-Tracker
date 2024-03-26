import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../Components/Footer";
import WorkoutShow from "../Components/WorkoutShow";
const Workouts = () => {
  const [inputValue, setInputValue] = useState({
    date: "",
    muscle: "",
    duration: "",
    sets: "",
  });
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { date, muscle, duration, sets } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const convertedData = {
      date: moment(date).format(), // Convert date to ISO 8601 format
      muscle,
      duration: parseInt(duration, 10), // Parse duration to number
      sets: parseInt(sets, 10), // Parse sets to number
    };

    try {
      const { data } = await axios.post(
        "http://localhost:4000/workouts",
        convertedData
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {}, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      date: "",
      muscle: "",
      duration: "",
      sets: "",
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/workouts"); // Replace with your API endpoint
        console.log(response.data);
        setWorkouts(response.data.data.workouts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Link to={"/"} className="btn btn-primary btn-lg btn-block my-2">
        <i class="fi fi-rr-arrow-left" />
        <span> BACK TO HOME</span>
      </Link>
      <div className="form_container mx-auto">
        <h2>Workout Session</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Date">Date</label>
            <input
              type="date"
              name="date"
              value={date}
              placeholder="Enter the Date of workout"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="muscle">Muscle Group</label>
            <input
              type="text"
              name="muscle"
              value={muscle}
              placeholder="Enter the Muscle group trained"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration (in Minutes)</label>
            <input
              type="number"
              name="duration"
              value={duration}
              placeholder="Enter the duration"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="sets">Sets</label>
            <input
              type="number"
              name="sets"
              value={sets}
              placeholder="Enter the number of sets performed"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="workout-container">
        {isLoading && <p>Loading workouts...</p>}
        {error && <p>Error: {error}</p>}
        {workouts.length > 0 && ( // Only render list if workouts exist
          <WorkoutShow workouts={workouts} />
        )}
        {workouts.length === 0 && !isLoading && <p>No workouts found.</p>}
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Workouts;
