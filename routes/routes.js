// let User = require("model/user");
const express = require("express");
const app = express();

module.exports = {
  // Signin API
  signIn: (req, res) => {
    res.send("hello");
  },

  // Registration API
  register: (req, res) => {
    res.send("Hello World!");
  },
  // Services API
  services: (req, res) => {
    res.send("Hello World!");
  },

  getServiceByID: (req, res) => {
    res.send("Hello World!");
  },

  // Shop API
  shop: (req, res) => {
    res.send("Hello World!");
  },

  getShopById: (req, res) => {
    res.send("Hello World!");
  },
};
