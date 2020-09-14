// let User = require("model/user");
const express = require("express");
const app = express();

module.exports = {
  // Signin API
  signIn: (res) => {
    // app.get("/signin", (req, res) => {
    //   res.send("Hello World!");
    // });
    res.send("hello");
  },

  // Registration API
  register: () => {
    app.get("/register", (req, res) => {
      res.send("Hello World!");
    });
  },

  // Services API
  services: () => {
    app.get("/services", (req, res) => {
      res.send("Hello World!");
    });
  },

  getServiceByID: () => {
    app.get("/services/id", (req, res) => {
      res.send("Hello World!");
    });
  },

  // Shop API
  shop: () => {
    app.get("/shop", (req, res) => {
      res.send("Hello World!");
    });
  },

  getShopById: () => {
    app.get("/shop/id", (req, res) => {
      res.send("Hello World!");
    });
  },
};
