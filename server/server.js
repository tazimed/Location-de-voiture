import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const server = express();
server.use(express.json());
server.use(cors());
server.use(cookieParser());

server.listen(4000, () => {
  console.log("serever listening !");
});

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
  console.log("Received request data:", req.body);
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

server.post("/login", (req, res) => {
  console.log("Received request data:", req.body);

  const sqlLogin = "SELECT email, password FROM clients WHERE email = ?";

  db.query(sqlLogin, [req.body.email], (err, data) => {
    if (err) {
      console.error("Login Error in server:", err);
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

server.post("/addCars", (req, res) => {
  console.log("Received car data:", req.body);

  const sqlCar =
    "INSERT INTO voiture (`matricule`, `marque`, `model`, `couleur`, `nombrePlaces`, `transmission`, `image`) VALUES (?)";
  const values = [
    req.body.matricule,
    req.body.marque,
    req.body.model,
    req.body.couleur,
    parseInt(req.body.nbr_places),
    req.body.transmission,
    req.body.image,
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
