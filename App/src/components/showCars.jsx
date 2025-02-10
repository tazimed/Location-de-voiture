import axios from "axios";
import AOS from "aos";
import { useState, useEffect } from "react";
import image from "/images/key.jpg";
import "./showCars.css";
import { format } from "date-fns";

export default function ShowCars() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedCars, setExpandedCars] = useState({}); // Track expanded cars

  // Initialize AOS (for animation effects)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 120,
      once: true,
      delay: 0,
    });
  }, []);

  // Fetch cars from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:4000/showCars");
        setCars(response.data.Result || []);
      } catch (error) {
        setError("Failed to load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Handle the "show more/show less" toggle
  const toggleShowMore = (carId) => {
    setExpandedCars((prevExpandedCars) => ({
      ...prevExpandedCars,
      [carId]: !prevExpandedCars[carId],
    }));
  };

  return (
    <div className="container w-full">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
          <p className="ml-4 text-blue-500 font-semibold">Loading...</p>
        </div>
      ) : error ? (
        <>
          <p className="error">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Retry
          </button>
        </>
      ) : !cars.length ? (
        <div className="empty-state">
          <img src={image} alt="No cars available" className="default-image" />
          <p>No cars available at the moment.</p>
        </div>
      ) : (
        <ul className="car-list">
          {cars.map((car) => (
            <li
              key={`${car.cin}`}
              data-aos="fade-up"
              className="car-list-item hover:cursor-pointer"
            >
              <h3>
                <strong className="text-cyan-700 text-lg">
                  {car.marque || "Unknown Brand"}
                </strong>{" "}
                {car.prix || "Prix N/A"} DH
                <br />
                {car.date_debut_location
                  ? `disponible de ${format(
                      new Date(car.date_debut_location),
                      "dd MMMM yyyy"
                    )}`
                  : "toujours disponible"}{" "}
                {car.date_fin_location &&
                  `jusqu'à ${format(
                    new Date(car.date_fin_location),
                    "dd MMMM yyyy"
                  )}`}
              </h3>

              {/* Additional car details toggle */}
              {expandedCars[car.id] && (
                <div className="additional-details">
                  <p>
                    <strong>Couleur:</strong> {car.couleur || "Non spécifiée"}
                  </p>
                  <p>
                    <strong>Transmission:</strong>{" "}
                    {car.transmission || "Non spécifiée"}
                  </p>
                  <p>
                    <strong>Nombre de places:</strong>{" "}
                    {car.nombrePlaces || "Non spécifié"}
                  </p>
                </div>
              )}

              <button
                onClick={() => toggleShowMore(car.id)} // Toggle specific car details
                className="text-blue-500 hover:underline mt-2"
              >
                {expandedCars[car.id] ? "Show Less" : "Show More"}
              </button>

              {/* Car image */}
              {car.image ? (
                <img
                  src={car.image}
                  alt={`${car.marque || "Car"} ${car.model || ""}`}
                  className="car-image"
                />
                
              ) : (
                <p>No image available</p>
              )}
              <button  className="bg-blue-300 dark:bg-blue-950">Louwer</button>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
}
