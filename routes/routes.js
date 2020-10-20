require("dotenv").config();

const bcrypt = require("bcrypt");
const Services = require("../model/services");
const Shop = require("../model/shop");
const User = require("../model/user");
require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { getMaxListeners } = require("../model/services");
const { response } = require("express");


module.exports = {
  // Signin API
  signIn: (req, res) => {
    let myPlaintextPassword = req.body.password;

    User.findOne({ email: req.body.email }) //find exactly one match
      .then((aUser) => {
        let hash = aUser.password;

        bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
          const sendSuccess = {
            email: aUser.email,
            username: aUser.username,
            status: "Success",
          };

          const sendFailure = {
            status: "Failure",
            reason: "Invalid password",
          };

          if (result) {
            res.status(200).json(sendSuccess);
          } else {
            res.json(sendFailure);
          }
        });
      })
      .catch((error) => {
        const sendFailure = {
          status: "Failure",
          reason: "username does not exist",
        };

        res.status(404).send(sendFailure);
      });
  },

  // Registration API
  register: (req, res) => {
    const saltRounds = Math.floor(Math.random() * 10);
    const myPlaintextPassword = req.body.password;
    //verify if already contains an email address

    User.find({ email: req.body.email }, (err, response) => {
      const sendSuccess = {
        email: req.body.email,
        status: "Success",
      };

      const sendFailure = {
        status: "Failure",
        reason: "Email already exist",
      };

      //does not contains an email
      if (response.length == 0) {
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

        res.send(sendSuccess);
      }
      //contains an email
      else {
        res.send(sendFailure);
      }
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

  verifyEmail: (req, res) => {
    User.find({ email: req.body.email }, (err, response) => {
      console.log(response);

      const sendSuccess = {
        email: req.body.email,
        status: "Success",
      };

      const sendFailure = {
        status: "Failure",
        reason: "Email does not exist",
      };

      //contains an email
      if (response.length) {
        res.send(sendSuccess);
      }
      // does not contains an email
      else {
        res.send(sendFailure);
      }
    });
  },

  resetPassword: (req, res) => {
    const email = req.body.email;
    ("use strict");
    console.log("hllo", req.body);

    let secret_token = "";

    User.findOne({ email: "apple"}, (err, response) => {
      console.log(response.id);
      if (!response) {
        console.log("Email is not in DB");
        res.sendStatus(404);
      } else {
       
        const payload = {
          id:response.id,
          email:email
        }

         secret_token = response.password;

        const accessToken = jwt.sign(payload, secret_token);
      }
    })

  
      

        
    async function main() {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PW,
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Sup my guy ✔", // Subject line
        text: "Hello from the other siiiiiiiiiiiiiiide", // plain text body
        html: '<p>Click <a href="http://localhost:3000/reset_password/' + secret_token + '">here</a> to reset your password</p>', // html body
      });

      console.log("Message sent: %s", info.messageId);

      transporter.sendMail(info, function (error, info) {
        if (error) {
          console.log(error);
          res.status(400).json({ status: "Failure!" });
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ status: "Success!" });
        }
      });
    }

    main().catch(console.error);
  },
  
};
