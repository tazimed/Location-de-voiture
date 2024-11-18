import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SignUp() {
  const [information, setInformation] = useState({
    cin: "",
    nom: "",
    prenom: "",
    adress: "",
    email: "",
    tel: "",
    password: "",
  });

  const navigate = useNavigate();

  // Images de fond
  const images = [
    "/images/imageinscription.png",
    "/images/photoapp.jpg",
    "/images/one-enterprise-fleet-emea.avif",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/signup", information)
      .then((res) => {
        if (res.data.Status === "success") {
          navigate("/login");
        } else {
          alert("Erreur");
        }
      })
      .catch((err) => console.log(err));
  };

  const gotoLogin = () => navigate("/login");

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundImage: `url(${images[currentImageIndex]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "background-image 1s ease-in-out",
      overflowY: "auto",
      padding: "20px",
    },
    card: {
      padding: "1.5rem",
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      maxWidth: "400px", // Largeur maximale réduite pour un formulaire compact
      width: "90%", // Prend jusqu'à 90% de l'écran sur les petits appareils
      maxHeight: "80vh", // Limite la hauteur pour éviter le débordement
      overflowY: "auto", // Active le défilement si le contenu dépasse
    },
    title: {
      textAlign: "center",
      marginBottom: "1rem",
      color: "#004aad",
    },
    button: {
      backgroundColor: "#ff5733",
      borderColor: "#ff5733",
      color: "#fff",
      borderRadius: "20px",
      padding: "10px 20px",
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    },
    buttonSecondary: {
      backgroundColor: "#6c757d",
      borderColor: "#6c757d",
      color: "#fff",
      borderRadius: "20px",
      padding: "10px 20px",
      marginLeft: "10px",
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} className="card">
        <h3 style={styles.title}>Inscription</h3>
        <form onSubmit={handleSubmit}>
          {["cin", "nom", "prenom", "adress", "tel", "email"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setInformation((prev) => ({
                    ...prev,
                    [field]: e.target.value.toLowerCase(),
                  }))
                }
              />
            </div>
          ))}
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) =>
                setInformation((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#ff7f50")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff5733")}
            >
              Inscription
            </button>
            <button
              type="button"
              className="btn"
              style={styles.buttonSecondary}
              onClick={gotoLogin}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#7a828c")} 
              onMouseOut={(e) => (e.target.style.backgroundColor = "#6c757d")} 
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
