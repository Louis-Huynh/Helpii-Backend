const express = require("express");
var cors = require("cors");

var bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

let routes = require("./routes/routes.js");

app.get("/signin", (req, res) => {
  routes.signIn(req, res);
});

app.get("/services", (req, res) => {
  routes.services(req, res);
});

app.post("/register", (req, res) => {
  routes.register(req, res);
});

app.get("/services/id", (req, res) => {
  routes.getServiceByID(req, res);
});

app.get("/shop", (req, res) => {
  routes.shop(req, res);
});

app.get("/shop/id", (req, res) => {
  routes.getShopById(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
