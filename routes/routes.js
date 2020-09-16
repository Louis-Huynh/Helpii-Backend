const bcrypt = require("bcrypt");

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

    res.send("signin");
  },

  // Registration API
  register: (req, res) => {
    console.log(req.body);

    const saltRounds = Math.floor(Math.random() * 10);
    const myPlaintextPassword = "hello";

    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);
    });

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
