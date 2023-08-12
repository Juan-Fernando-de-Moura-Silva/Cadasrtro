const express = require('express')
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const PORT = 3001;

const { encrypt, decrypt } = require("./Segredo");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "PasswordManager",
});

app.post('/addpassword', (req, res) => {
  const { password, title } = req.body; // Corrija 'req.boby' para 'req.body'
  const hashedPassword = encrypt(password);
  db.query(
    "INSERT INTO Senhas (password, title, iv) VALUES (?, ?, ?)",
    [hashedPassword.password, title, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM Senhas;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

app.listen(PORT, () => {
  console.log("Server is running");
});