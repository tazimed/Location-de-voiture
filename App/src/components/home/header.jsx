import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  // Persist theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <div>
      {/* Header Section */}
      <header className="HeaderSection flex justify-between items-center p-4 bg-white dark:bg-gray-800 text-black dark:text-white fixed top-0 left-0 right-0 w-full opacity-90 z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">RideNOW</h1>
          <img
            className="w-10 h-10 ml-2"
            src="/images/driveNOW.png"
            alt="Logo"
          />
        </div>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="text-black dark:text-gray-300 no-underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#aboutSection"
                className="text-black dark:text-gray-300 no-underline"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#productsSection"
                className="text-black dark:text-gray-300 no-underline"
              >
                Product
              </a>
            </li>
          </ul>
        </nav>

        <button
          onClick={toggleDarkMode}
          className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition-all duration-300 
             hover:bg-gray-300 dark:hover:bg-gray-600 
             hover:shadow-lg hover:shadow-gray-500 dark:hover:shadow-gray-900"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="signUp flex space-x-4">
          <Link
            className="text-green-700 hover:underline dark:text-green-400"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="text-blue-500 hover:underline dark:text-blue-300"
            to="/signup"
          >
            SignUp
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
