const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

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
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(express.json);

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
function creareElevi() {
  app.get("/createelevi", (req, res) => {
    let sql =
      "CREATE TABLE IF NOT EXISTS elevi (id_elev INT NOT NULL, nume VARCHAR(10), prenume VARCHAR(10), clasa CHAR(3), PRIMARY KEY (id_elev))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Table elevi created");
    });
  });
}

// Create table profesori
function creareProfesori() {
  app.get("/createprofesori", (req, res) => {
    let sql =
      "CREATE TABLE IF NOT EXISTS profesori (id_profesor INT NOT NULL, nume VARCHAR(10), prenume VARCHAR(10), clasa_diriginte CHAR(2), id_materie INT, PRIMARY KEY (id_profesor))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Table profesori created");
    });
  });
}

// Create table note
function creareNote() {
  app.get("/createnote", (req, res) => {
    let sql =
      "CREATE TABLE IF NOT EXISTS note (id_elev INT NOT NULL, id_materie INT NOT NULL, valoare INT, PRIMARY KEY (id_elev))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Table note created");
    });
  });
}

// Create table clase
function creareClase() {
  app.get("/createclase", (req, res) => {
    let sql =
      "CREATE TABLE IF NOT EXISTS clase (clasa CHAR(3) , id_profesor INT NOT NULL)";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Table clase created");
    });
  });
}

//Functie de inserare in clase
function insereazaInClasa() {
  app.get("/insereazaclase/:clasa/:diriginte", (req, res) => {
    let sql = `INSERT INTO clase (clasa, id_profesor) VALUES ("${req.params.clasa}", "${req.params.diriginte}")`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Insert made");
    });
  });
}

function deleteClasa() {
  app.get("/deleteclasa/:clasa", (req, res) => {
    let sql = `DELETE FROM clase WHERE clasa="${req.params.clasa}"`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Table updated");
    });
  });
}

function insereazaElevi() {
  app.get("/insereazaelev/:id_elev/:nume/:prenume/:clasa", (req, res) => {
    let sql = `INSERT INTO elevi (id_elev, nume, prenume, clasa) VALUES ("${req.params.id_elev}", "${req.params.nume}", "${req.params.prenume}", "${req.params.clasa}")`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Insert made");
    });
  });
}

creareElevi();
creareProfesori();
creareClase();
creareNote();
deleteClasa();
insereazaInClasa();
insereazaElevi();

function fetchData(response, clasa) {
  let sql = "SELECT * FROM elevi e JOIN clase c ON e.clasa=c.clasa";
  let query = db.query(sql, (err, result) => {
    console.log(result);
    response.write("<table><tr>");
    for (var column in result[0]) {
      response.write("<td><lable>" + column + "</lable></td>");
      response.write("</tr>");
    }
    for (var row in result) {
      response.write("</tr>");
      for (var column in result[row]) {
        response.write("<td><lable>" + result[row][column] + "</lable></td>");
      }
      response.write("</tr>");
    }
    response.end("</table>");
  });
}

//Trimite clasele
function fetchClasa(response, clasa) {
  let sql = "SELECT * FROM elevi e JOIN clase c ON e.clasa=c.clasa";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    response.render(__dirname + "/views/clasa.ejs", {arr: result});
  });
}

function search(response){
  // console.log(response);
  response.render(__dirname + "/views/index.ejs");
}

app.get("/", (req, res) => {
  // console.log(req.body);
  search(res);
  console.log("Done. Displayed data! ");
});

app.get("/fetch", (req, res) => {
  clasa = req.query.clasa;
  console.log('Clasa cautata este: ' + clasa);
  fetchClasa(res, req.query.clasa);
  console.log("Displayed clasa");
});


app.listen("3000", () => {
  console.log("Server running on port 3000!");
});
