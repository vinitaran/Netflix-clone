const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose; //Grab schema object from mongoose

mongoose.connect(
  "mongodb+srv://netflix-api:XmeuG6nKjKE68Yy@cluster0.qp0ge.mongodb.net/netflix-api-db?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
  const pw = req.body.password;
  const email = req.body.email;
  User.findOne({ email: email, password: pw }, (err, user) => {
    if (user) {
      res.send({
        status: "valid user",
      });
    } else {
      res.send(404, {
        status: "Not found",
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
