const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let routes = require("./routes/routes.js");

app.get("/signin", (req, res) => {
  routes.signIn(req, res);
});

app.get("/services", (req, res) => {
  routes.services(req, res);
});

app.get("/register", (req, res) => {
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
