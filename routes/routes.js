const bcrypt = require("bcrypt");
const Services = require("../model/services");
const Shop = require("../model/shop");
const User = require("../model/user");

module.exports = {
  // Signin API
  signIn: (req, res) => {
    let myPlaintextPassword = req.body.password;

    User.findOne({ email: req.body.email })
      .then((aUser) => {
        let hash = aUser.password;

        bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
          const sendResult = {
            email: aUser.email,
          };

          if (result) {
            res.status(200).json(sendResult);
          } else {
            res.status(400).json({ error: "Invalid password" });
          }
        });
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        res.status(404).send({ error: "username does not exist" });
      });
  },

  // Registration API
  register: (req, res) => {
    const saltRounds = Math.floor(Math.random() * 10);
    const myPlaintextPassword = req.body.password;

    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      //need the image

      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then((savedUser) => {
          savedUser.toJSON();
          console.log(savedUser);
        })
        .then((savedAndFormattedUser) => res.json(savedAndFormattedUser))
        .catch((error) => next(error));
    });
  },
  // Services API
  services: (req, res) => {
    Services.find({}).then((services) => {
      res.json(services);
    });
  },

  getServiceByID: (req, res) => {
    res.send("service by id");
  },

  // Shop API
  shop: (req, res) => {
    Shop.find({}).then((shop) => {
      res.json(shop);
    });
    // res.send("shop");
  },

  getShopById: (req, res) => {
    res.send("shop by id");
  },

  home: (req, res) => {
    res.json({ name: "tobyeet" });
  },

  postShop: (req, res) => {
    //logic here
  },

  postServices: (req, res) => {
    console.log(req.body);

    const services = new User({
      title: req.body.title,
    });

    services
      .save()
      .then((x) => x.toJSON())
      .then((savedAndFormattedService) => res.json(savedAndFormattedService))
      .catch((error) => next(error));
  },
};
