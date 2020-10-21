const express = require("express");
var cors = require("cors");

var bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();
////
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

////

const port = process.env.PORT || 3001;

let routes = require("./routes/routes.js");

app.get("/", (req, res) => {
  routes.home(req, res);
});

app.post("/signin", (req, res) => {
  routes.signIn(req, res);
});

app.get("/services", (req, res) => {
  routes.services(req, res);
});

app.get("/services/id", (req, res) => {
  routes.getServiceByID(req, res);
});

app.get("/shop", (req, res) => {
  console.log("yo shopping");
  routes.shop(req, res);
});

app.get("/shop/id", (req, res) => {
  routes.getShopById(req, res);
});

app.post("/register", (req, res) => {
  routes.register(req, res);
});

app.post("/services", (req, res) => {
  routes.postServices(req, res);
});

app.post("/shop", (req, res) => {
  routes.postShop(req, res);
});

app.post("/verify_email", (req, res) => {
  routes.verifyEmail(req, res);
});

app.post("/reset_password", (req, res) => {
  routes.sendEmailToken(req, res);
});

app.get("/reset_password/:id/:token", (req, res)=>{
  routes.verifyEmailToken(req, res);
})

app.post("/reset_password/:id/:token", (req, res)=>{
  routes.changeForgotPassword(req, res);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
