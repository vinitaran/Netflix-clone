const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose; //Grab schema object from mongoose
require("dotenv").config();
var cors = require("cors");

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.qp0ge.mongodb.net/netflix-api-db?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
app.use(cors());
app.use(express.json());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const User = mongoose.model(
  "User",
  new Schema({
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const pw = req.body.password;
  User.findOne({ email: email, password: pw }, (err, user) => {
    if (user) {
      res.send({
        status: "valid",
      });
    } else {
      res.send(404, {
        status: "Not found user",
      });
    }
  });
});

//upload data on database
app.post("/register", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save((err, user) => {
    if (err) {
      res.send(400, {
        status: err,
      });
    }
    console.log(user);
    res.send("registered");
  });
});

app.listen("3000", console.log("Listening on port 3000"));
