// let User = require("model/user");
const express = require("express");
const app = express();

module.exports = {
  // Signin API
  signIn: (req, res) => {
    res.send("signin");
  },

  // Registration API
  register: (req, res) => {
    res.send("register");
  },
  // Services API
  services: (req, res) => {
    res.send("services");
  },

  getServiceByID: (req, res) => {
    res.send("service by id");
  },

  // Shop API
  shop: (req, res) => {
    res.send("shop");
  },

  getShopById: (req, res) => {
    res.send("shop by id");
  },
};
