import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import AddCar from "./components/addCars";
import ShowCars from "./components/showCars";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addCars" element={<AddCar />} />\
        <Route path="/showCars" element={<ShowCars />} />
      </Routes>
    </Router>
  );
}

export default App;
