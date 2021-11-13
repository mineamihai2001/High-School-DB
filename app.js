const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { Router } = require("express");
const route = express.Router();

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
      "CREATE TABLE elevi (id_elev INT NOT NULL AUTO_INCREMENT, nume VARCHAR(10), prenume VARCHAR(10), clasa CHAR(3), PRIMARY KEY (id_elev))";
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
      "CREATE TABLE IF NOT EXISTS profesori (id_profesor INT NOT NULL, nume_p VARCHAR(10), prenume_p VARCHAR(10), clasa_diriginte CHAR(3), id_materie INT, PRIMARY KEY (id_profesor))";
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
      "CREATE TABLE IF NOT EXISTS note (id_elev INT NOT NULL, id_curs INT NOT NULL, valoare INT, PRIMARY KEY (id_elev))";
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
      counter_id++;
      console.log(result);
      res.send("Insert made");
    });
  });
}

function insereazaProfesori() {
  app.get(
    "/insereazaprofesor/:id_profesor/:nume/:prenume/:clasa_diriginte/:id_materie",
    (req, res) => {
      let sql = `INSERT INTO profesori (id_profesor, nume_p, prenume_p, clasa_diriginte, id_materie) VALUES ("${req.params.id_profesor}", "${req.params.nume}", "${req.params.prenume}", "${req.params.clasa_diriginte}", "${req.params.id_materie}")`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Insert made");
      });
    }
  );
}

function randomElevi() {
  var nume = [
    "Popa",
    "Nita",
    "Constantinescu",
    "Stan",
    "Dima",
    "Stoica",
    "Cristea",
    "Sava",
    "Calinescu",
    "Voinea",
    "Florea",
  ];
  var prenume = [
    "Adelina",
    "Claudia",
    "Denisa",
    "Ilinca",
    "Sabina",
    "Andrei",
    "Marius",
    "Eugen",
    "Horatiu",
    "Stefan",
  ];
  var elev = [
    {
      id: 14,
      p: "mihai",
      n: "minea",
    },
  ];

  app.get("/randomelevi/:clasa", (req, res) => {
    for (let i = 0; i < 20; ++i) {
      elev[i].id = i + 14;
      elev[i].n = nume[Math.floor(Math.random() * 10)];
      elev[i].p = prenume[Math.floor(Math.random() * 10)];
      console.log(elev);

      let sql = `INSERT INTO elevi (id_elev, nume, prenume, clasa) VALUES ("${elev[i].id}", "${elev[i].n}", "${elev[i].p}", "${req.params.clasa}")`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
      });
    }
    res.send("Insert made");
  });
}

creareElevi();
creareProfesori();
creareClase();
creareNote();
deleteClasa();
insereazaInClasa();
insereazaElevi();
insereazaProfesori();
randomElevi();


function insereazaElev(clasa, nume, prenume) {
    let sql = `INSERT INTO elevi (nume, prenume, clasa) VALUES ("${nume}", "${prenume}", "${clasa}")`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log("Elev inserat");
  });
}

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
  let sql = `SELECT * FROM elevi e JOIN clase c ON e.clasa=c.clasa JOIN profesori p ON c.id_profesor=p.id_profesor WHERE e.clasa="${clasa}"`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    response.render(__dirname + "/views/clasa.ejs", { arr: result });
  });
}

function fetchNote(response, id) {
  let sql = `SELECT * FROM note n JOIN elevi e ON e.id_elev=n.id_elev JOIN cursuri c ON c.id_curs=n.id_curs WHERE n.id_elev=${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    response.render(__dirname + "/views/detaliielev.ejs", { elev: result });
  });
}

//Pagina principala
function search(response) {
  // console.log(response);
  response.render(__dirname + "/views/index.ejs");
}
app.get("/", (req, res) => {
  // console.log(req.body);
  search(res);
  console.log("Done. Displayed data! ");
});

//Pagina clasei cautate
app.get("/fetch", (req, res) => {
  var clasa = req.query.clasa;
  var nume_nou = req.query.nume_nou;
  var prenume_nou = req.query.prenume_nou;
  console.log("Clasa cautata este: " + clasa);
  console.log("Elevul adaugat este: " + nume_nou + " " + prenume_nou);
  if (!(typeof nume_nou === "undefined" || typeof prenume_nou === "undefined"))
    insereazaElev(clasa, nume_nou, prenume_nou);
  fetchClasa(res, clasa);
  console.log("Displayed clasa");
});

//Fisa elevului
app.get("/detaliielev/:id", (req, res) => {
  let id = req.params.id;
  console.log("A fost selectat elevul cu id:" + id);
  fetchNote(res, id);
});

app.listen("3000", () => {
  console.log("Server running on port 3000!");
});

module.exports = route;
