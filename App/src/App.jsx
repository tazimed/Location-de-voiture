import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import AddCar from "./components/addCars";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addCars" element={<AddCar />} />
      </Routes>
    </Router>
  );
}

export default App;
