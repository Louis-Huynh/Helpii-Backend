const bcrypt = require("bcrypt");
const Services = require("../model/services");
const Shop = require("../model/shop");
const User = require("../model/user");

module.exports = {
  // Signin API
  signIn: (req, res) => {
    let hash = "$2b$08$QtEab42ndLWinNQhxh8AGei/q7SOWpeO.zVCC6OL9s3166t/xxHDS";
    let myPlaintextPassword = "helloae";

    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      // result == true
      if (result) {
        console.log("it's good");
      } else {
        console.log("it's bad");
      }
    });
  },

  // Registration API
  register: (req, res) => {
    console.log(req.body);

    const saltRounds = Math.floor(Math.random() * 10);
    const myPlaintextPassword = "hello";
    console.log(res.data);
    let hashedPass;
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);
      hashedPass = hash;
    });

    //need the image
    const user = new User({
      username: res.data.username,
      email: res.data.email,
      password: res.data.hashedPass,
    });

    user
      .save()
      .then((savedUser) => savedUser.toJSON())
      .then((savedAndFormattedUser) => res.json(savedAndFormattedUser))
      .catch((error) => next(error));

    // res.send("register");
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

    // const saltRounds = Math.floor(Math.random() * 10);
    // const myPlaintextPassword = "hello";
    // console.log(res.data);
    // let hashedPass;
    // bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    //   // Store hash in your password DB.
    //   console.log(hash);
    //   hashedPass = hash;
    // });
  },
};
