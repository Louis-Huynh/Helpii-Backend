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
const user = require("../model/user");

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

  sendEmailToken: (req, res) => {
    const email = req.body.email;
    ("use strict");

    User.findOne({ email: email }, (err, response) => {
      if (!response) {
        console.log("Email is not in DB");
        return res.status(404);
      } else {
        const payload = {
          id: response.id,
          email: email,
        };

        const secret_token = response.password;

        const accessToken = jwt.sign(payload, secret_token, {
          expiresIn: "1h",
        });

        async function main() {
          // create reusable transporter object using the default SMTP transport
          var transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PW,
            },
          });

          // send mail with defined transport object
          //Fails when inputting invalid emails that exist in the database
          //[]Imp a check for valid emails in the registration

          const urlReset = `http://localhost:3000/reset_password/${payload.id}/${accessToken}`;

          let info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, //recipient
            subject: "🥑Cheep cheep it's the Helpii police🦜", //email title
            html: `
            <div>
		        <h3>Reset Password</h3>
            <p>A password reset event has been triggered. The password reset window is limited to one hour.</p>

            <p>If you do not reset your password within the hour, you will need to submit a new request.</p>
            <p>To complete the password reset process, visit the following link:</p>
            <a href=${urlReset}>${urlReset}</a>
	          </div>
            
            `,
          });

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
      }
    });
  },

  //verifies that the token was not tampered with
  //If unaffected it gives access to the form
  verifyEmailToken: (req, res) => {
    //fetch user form db using id
    //decrypt one time use token

    User.findOne({ _id: req.params.id }, (err, response) => {
      if (err) {
        return res.status(404).json({ message: "error!" });
      }

      jwt.verify(req.params.token, response.password, (err, user) => {
        if (err) {
          console.log("Will not display pw reset form");
          return res.status(403).json({ Status: "Failure" });
        }
        console.log("user: ", user);

        res.status(202).json({ Status: "Success" });
      });
    });
  },

  changeForgotPassword: (req, res) => {
    const { password } = req.body;
    const { id, token } = req.params;

    console.log("password:", password);
    console.log(`id:${id}, token:${token}`);

    //finds user using id
    User.findOne({ _id: id }, (err, response) => {
      if (err) {
        return res.status(404).json({ message: "error!" });
      }
      console.log("it finds it: ", response);

      //verifies valid token using the token retrieved from param and the user's hashed pw(the key)
      jwt.verify(token, response.password, (err, payload) => {
        if (err) {
          console.log("Invalid token");
          return res.status(403).json({ status: "Failure" });
        }

        if (payload.id === response.id) {
          const saltRounds = Math.floor(Math.random() * 10);
          const myPlaintextPassword = password;

          //hashes new password and stores it in db
          bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
            if (err) res.status(400);

            User.findOneAndUpdate(
              { _id: id },
              { password: hash },
              { new: true }
            )
              .then((response) => {
                console.log("password changed!");
                res.status(202).json("Password changed accepted");
              })
              .catch((err) => res.status(500).json(err));
          });
        }
      });
    });
  },
};
