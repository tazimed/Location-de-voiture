import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleSubmitLogin(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/login", loginData)
      .then((res) => {
        if (res.data.Status == "Success") {
          console.log("Login successful", res);
        } else {
          console.log("Login Failed");
        }
      })
      .catch((err) => {
        console.error("Error logging in:", err);
      });
  }

  function goToSignup() {
    navigate("/signup");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Log in</h2>
        <div className="underline mb-4"></div>

        <form onSubmit={handleSubmitLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <FontAwesomeIcon icon={faEnvelope} /> Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              onChange={(event) =>
                setLoginData({ ...loginData, email: event.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <FontAwesomeIcon icon={faLock} /> Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              onChange={(event) =>
                setLoginData({ ...loginData, password: event.target.value })
              }
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goToSignup}
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <Link to="/" className="btn btn-link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
