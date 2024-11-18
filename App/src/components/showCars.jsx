import axios from "axios";
import { useState, useEffect } from "react";
import image from "/images/key.jpg";
import "./showCars.css";

export default function ShowCars() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:4000/showCars");
        console.log("Car data received:", response.data);
        setCars(response.data.Result || []);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    axios
      .get("http://localhost:4000/showCars")
      .then((response) => {
        console.log("Car data received:", response.data);
        setCars(response.data.Result || []);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
        setError("Failed to load cars. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="car-container">
      {loading ? (
        <p className="loading">Loading cars...</p>
      ) : error ? (
        <>
          <p className="error">{error}</p>
          <button onClick={retryFetch} className="retry-button">
            Retry
          </button>
        </>
      ) : !cars.length ? (
        <img src={image} alt="No cars available" className="default-image" />
      ) : (
        <>
          <h1>Notre entreprise représente</h1>
          <ul className="car-list">
            {cars.map((car) => (
              <li
                key={car.id || car.marque + car.model}
                className="car-list-item"
              >
                <h3>
                  <strong>{car.marque || "Unknown Brand"}</strong>{" "}
                  {car.model || "Unknown Model"} - {car.prix || "prix N/A"} DH,{" "}
                  {car.nombrePlaces || "N/A"} places,{" "}
                  {car.transmission || "N/A"}
                </h3>
                {car.image ? (
                  <img
                    src={`data:image/jpeg;base64,${car.image}`}
                    alt={`${car.marque || "Car"} ${car.model || ""}`}
                    className="car-image"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
