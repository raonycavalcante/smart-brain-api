const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "1601",
    database: "smart-brain",
  },
});
const clarifai = require("./controller/clarifai");
const signin = require("./controller/signin");
const register = require("./controller/register");
const profile = require("./controller/profile");
const image = require("./controller/image");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());



app.post('/clarifai', (req, res) => {clarifai.handleClarifai(req, res);});

app.get("/", (req, res) => {
  res.send('success');
});

app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, db)});

app.put("/image", (req, res) => {image.imageHandle(req, res, db)});

app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
