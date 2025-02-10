import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AddCar() {
  const [carInformation, setCarInformation] = useState({
    matricule: "",
    marque: "",
    model: "",
    couleur: "",
    nbr_places: "",
    transmission: "",
    prix: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmitCar(event) {
    event.preventDefault();

    if (
      !carInformation.matricule ||
      !carInformation.marque ||
      !carInformation.model ||
      !carInformation.couleur ||
      !carInformation.nbr_places ||
      !carInformation.transmission ||
      !carInformation.prix ||
      !carInformation.image
    ) {
      setMessage("Tous les champs doivent être remplis.");
      return;
    }

    const formData = new FormData();
    formData.append("matricule", carInformation.matricule);
    formData.append("marque", carInformation.marque);
    formData.append("model", carInformation.model);
    formData.append("couleur", carInformation.couleur);
    formData.append("nbr_places", carInformation.nbr_places);
    formData.append("transmission", carInformation.transmission);
    formData.append("prix", carInformation.prix);
    formData.append("image", carInformation.image);

    axios
      .post("http://localhost:4000/addCars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.Status === "success") {
          setMessage("Voiture ajoutée avec succès !");
        } else {
          setMessage("Erreur lors de l'ajout de la voiture.");
        }
      })
      .catch((err) => {
        setMessage("Erreur serveur, veuillez réessayer.");
        console.log(err);
      });
  }

  function gotoLogin() {
    navigate("/login");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="text-center mb-4">Ajouter une voiture</h3>
            <form onSubmit={handleSubmitCar}>
              <div className="mb-3">
                <label className="form-label">Matricule</label>
                <input
                  type="text"
                  className="form-control"
                  value={carInformation.matricule}
                  onChange={(e) =>
                    setCarInformation((prev) => ({
                      ...prev,
                      matricule: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Marque</label>
                <input
                  type="text"
                  className="form-control"
                  value={carInformation.marque}
                  onChange={(e) =>
                    setCarInformation((prev) => ({
                      ...prev,
                      marque: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Modèle</label>
                <input
                  type="text"
                  className="form-control"
                  value={carInformation.model}
                  onChange={(e) =>
                    setCarInformation((prev) => ({
                      ...prev,
                      model: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Couleur</label>
                <input
                  type="text"
                  className="form-control"
                  value={carInformation.couleur}
                  onChange={(e) =>
                    setCarInformation((prev) => ({
                      ...prev,
                      couleur: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre de places</label>
                <input
                  type="text"
                  className="form-control"
                  value={carInformation.nbr_places}
                  onChange={(e) =>
                    setCarInformation((prev) => ({
                      ...prev,
                      nbr_places: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Transmission</label>
                <input
                  type="text"
                  className="form-control"
                  value={carInformation.transmission}
                  onChange={(e) =>
                    setCarInformation((prev) => ({
                      ...prev,
                      transmission: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Prix</label>
                <input
                  type="text"
                  className="form-control"
                  value={carInformation.prix}
                  onChange={(e) =>
                    setCarInformation((prev) => ({
                      ...prev,
                      prix: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    setCarInformation((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                  type="file"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Ajouter
              </button>
            </form>

            <button
              onClick={gotoLogin}
              className="btn btn-secondary w-100 mt-3"
            >
              Connexion
            </button>

            {message && (
              <p className="mt-3 text-center text-success">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
