import { Link } from "react-router-dom";
import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function Home() {
  return (
    <div className="homePage d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="text-center mb-4">Welcome to the Car Rental System</h1>
      
      <div className="links text-center">
        <Link to="/login" className="btn btn-primary m-2">
          Login
        </Link>
        <Link to="/signup" className="btn btn-secondary m-2">
          Sign Up
        </Link>
        <Link to="/addCars" className="btn btn-success m-2">
          Add Car
        </Link>
      </div>
    </div>
  );
}

export default Home;
