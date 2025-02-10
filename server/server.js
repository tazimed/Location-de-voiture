import fs from "fs";
import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();

// Middleware
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));
server.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
server.use(cookieParser());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads/images");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

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
          if (data) {
            console.log(data[0].email);
            const userEmail = data[0].email;
            const token = jwt.sign({ userEmail: userEmail }, "jwt-secret", {
              expiresIn: "24h",
            });
            res.cookie("token", token);

            return res.json({ Status: "Success", token });
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
    "INSERT INTO voiture (`matricule`, `marque`, `model`, `couleur`, `nombrePlaces`, `transmission`, `prix`, `image`) VALUES (?)";

  const values = [
    req.body.matricule,
    req.body.marque,
    req.body.model,
    req.body.couleur,
    parseInt(req.body.nbr_places),
    req.body.transmission,
    parseFloat(req.body.prix),
    path.join("uploads/images", req.file.filename),
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

// POST route to receive filter dates
server.post("/home", (req, res) => {
  const { datedebut, datedefin } = req.body; // Extract dates from the request body
  console.log("Body received:", req.body);
  req.app.locals.date_debut = datedebut; // Store the date in app.locals for global use
  req.app.locals.date_fin = datedefin;
  res.status(200).send({ message: "Request successful" });
});

// GET route to fetch cars
server.get("/showCars", (req, res) => {
  const date_debut = req.app.locals.date_debut || null; // Default to null if no date is stored
  const getCars =
    "SELECT * FROM voiture WHERE date_debut_location > ? OR date_debut_location IS NULL"; // Correct SQL operator

  db.query(getCars, [date_debut], (err, result) => {
    if (err) {
      console.error("Error fetching cars:", err);
      return res.status(500).json({ Error: "Error fetching data" });
    }

    // Format response with proper image paths
    const cars = result.map((car) => ({
      ...car,
      image: car.image
        ? `${req.protocol}://${req.get("host")}/${car.image.replace(
            /\\/g,
            "/"
          )}`
        : null,
    }));

    console.log("Cars response:", cars);
    res.status(200).json({ Status: "success", Result: cars });
  });
});

// Serve Static Files
server.use("/uploads/images", express.static(uploadsDir));

// Start the server
server.listen(4000, () => {
  console.log("Server listening on port 4000!");
});
