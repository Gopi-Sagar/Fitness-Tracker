import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { Food, Home, Login, Signup, Workouts } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/food" element={<Food />} />
      </Routes>
    </div>
  );
}

export default App;
