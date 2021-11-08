const express = require("express");
const mysql = require("mysql");

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "liceu",
});

//Connect
db.connect((err) => {
  if (err) throw err;
  console.log("Mysql connected ...");
});

const app = express();

//Create db
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE IF NOT EXISTS liceu";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created");
  });
});

// Create table elevi
app.get("/createelevi", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS elevi (id_elev INT NOT NULL, nume VARCHAR(10), prenume VARCHAR(10), clasa CHAR(2), PRIMARY KEY (id_elev))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table elevi created");
  });
});

// Create table profesori
app.get("/createprofesori", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS profesori (id_profesor INT NOT NULL, nume VARCHAR(10), prenume VARCHAR(10), clasa_diriginte CHAR(2), id_materie INT, PRIMARY KEY (id_profesor))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table profesori created");
  });
});

// Create table note
app.get("/createnote", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS note (id_elev INT NOT NULL, id_materie INT NOT NULL, valoare INT, PRIMARY KEY (id_elev))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table note created");
  });
});

// Create table clase
app.get("/createclase", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS clase (clasa CHAR(2) , clasa_diriginte CHAR(2))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table clase created");
  });
});

app.get('/', (req, res)=>{
  // res.send('Hello!');  
  res.sendFile(__dirname + '/index.html');
});

app.listen("3000", () => {
  console.log("Server running on port 3000!");
});
