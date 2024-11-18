import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import multer from "multer";

const server = express();

// Middleware
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));
server.use(cors());
server.use(cookieParser());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql*2023",
  database: "location",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
    return;
  }
  console.log("Connected to database as ID", db.threadId);
});

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Signup Route
server.post("/signup", (req, res) => {
  const sqlClient =
    "INSERT INTO clients (`cin`, `nom`, `prenom`, `adress`, `tel`, `email`, `password`) VALUES (?)";
  const saltRounds = 10;

  bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ Error: "Error hashing password" });
    }

    const values = [
      req.body.cin,
      req.body.nom,
      req.body.prenom,
      req.body.adress,
      req.body.tel,
      req.body.email,
      hash,
    ];

    db.query(sqlClient, [values], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ Error: "Error inserting data" });
      }
      return res.status(200).json({ Status: "success", Result: result });
    });
  });
});

// Login Route
server.post("/login", (req, res) => {
  const sqlLogin = "SELECT email, password FROM clients WHERE email = ?";

  db.query(sqlLogin, [req.body.email], (err, data) => {
    if (err) {
      console.error("Login Error:", err);
      return res.status(500).json({ Error: "Error during login" });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) {
            console.error("Password compare error:", err);
            return res.status(500).json({ Error: "Password compare error" });
          }
          if (response) {
            return res.json({ Status: "Success" });
          } else {
            return res.json({ Status: "Password or login not matched" });
          }
        }
      );
    } else {
      return res.status(404).json({ user_not_found: "Check your data" });
    }
  });
});

// Add Car Route
server.post("/addCars", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ Error: "No image file uploaded" });
  }

  const sqlCar =
    "INSERT INTO voiture (`matricule`, `marque`, `model`, `couleur`, `nombrePlaces`, `transmission`,`prix`, `image`) VALUES (?)";

  const imageBuffer = req.file.buffer;

  const values = [
    req.body.matricule,
    req.body.marque,
    req.body.model,
    req.body.couleur,
    parseInt(req.body.nbr_places),
    req.body.transmission,
    parseFloat(req.body.prix),
    imageBuffer,
  ];

  db.query(sqlCar, [values], (err, result) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(500).json({
        Error: "Error inserting car data",
        Details: err.sqlMessage || err,
      });
    }
    return res.status(200).json({ Status: "success", Result: result });
  });
});

// Show Cars Route
server.get("/showCars", (req, res) => {
  const getCars =
    "SELECT marque, model, prix, nombrePlaces, transmission, image FROM voiture";

  db.query(getCars, (err, result) => {
    if (err) {
      console.error("Error fetching cars:", err);
      return res.status(500).json({ Error: "Error fetching data" });
    }
    const cars = result.map((car) => ({
      ...car,
      image: car.image.toString("base64"),
    }));
    res.status(200).json({ Status: "success", Result: cars });
  });
});

// Start the server
server.listen(4000, () => {
  console.log("Server listening on port 4000!");
});
