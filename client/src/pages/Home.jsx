import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../Components/Footer";
import { quotes } from "../data";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  // Assuming 'token' is a specific value from cookies
  const token = cookies.token;

  useEffect(() => {
    const verifyCookie = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        if (status) {
          setUsername(user);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
        navigate("/login");
      }
    };
    const randomIndex = Math.floor(Math.random() * quotes.length); // Get a random index
    setQuote(quotes[randomIndex].quote); // Set quote state
    setAuthor(quotes[randomIndex].author); // Set author state

    verifyCookie();
    // Include `token` directly if it changes over time and should re-trigger the effect
  }, [token, navigate, removeCookie]);
  const logout = () => {
    removeCookie("token");
    navigate("/login"); // Consider redirecting to login for consistency
  };

  const NavBar = ({ username, onLogout }) => {
    return (
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          {/* Brand Logo */}
          <Link className="navbar-brand text-white" to="/">
            Better Fit
          </Link>

          {/* Toggler Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="navbar-nav mx-auto mb-2 mb-lg-0">
              {/* Centered Links */}
              <Link className="nav-link active text-white" to="/">
                Home
              </Link>
              <Link className="nav-link text-white" to="/food">
                Food
              </Link>
              <Link className="nav-link text-white" to="/workouts">
                Workout
              </Link>
            </div>

            {/* Profile Dropdown on the Right */}
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle text-white"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fi fi-rr-user"></i> {/* Adjust path as necessary */}
                  {username}
                </span>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <span className="dropdown-item" onClick={onLogout}>
                      Logout
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <div className="home_page ">
        <NavBar username={username} onLogout={logout} />
        <div class="card quote my-5 ">
          <div class="card-header">Quote</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{quote}</p>
              <footer class="blockquote-footer">{author}</footer>
            </blockquote>
          </div>
        </div>
        <div class="d-flex justify-content-evenly">
          <div class="col-sm-5 mb-3 mb-sm-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title fw-semibold fst-italic">Vision</h5>
                <p class="card-text">
                  Our vision is to empower individuals to achieve their unique
                  fitness aspirations through a personalized, data-driven, and
                  engaging mobile experience. We aim to break down barriers to
                  fitness by offering a comprehensive, accessible, and
                  supportive mobile platform.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-5 mb-3 mb-sm-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title fw-semibold fst-italic">Mission</h5>
                <p class="card-text">
                  Our mission is to democratize fitness by providing a
                  comprehensive, accessible, and supportive mobile platform.
                  This platform will inspire users to embrace healthy habits,
                  celebrate their achievements, and move their bodies with
                  confidence, regardless of their fitness level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home;
