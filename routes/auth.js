const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
var activeUser;
const nodemailer = require("nodemailer");
var Recaptcha = require('express-recaptcha').RecaptchaV2;
var recaptcha = new Recaptcha(process.env.RECAPTCHA_SITEKEY, process.env.RECAPTCHA_SITESECRET);
var zxcvbn = require('zxcvbn');

router.get("/signup", recaptcha.middleware.render, (req, res, next) => {
  res.render("auth/signup", {captcha:res.recaptcha});
});

router.post("/signup", recaptcha.middleware.verify, (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  
  zxcvbn(password, req.body);

  for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length )];
  }

  if (email === "" || password === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }

  User.findOne({email}, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "This email already exists" });
      return;
    }
  })

  async function sendConfirmationEmail() {
    let transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      port: 465,
      secure: true, // true for port 465, must be false for other ports
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
      }
    });
    
    let info = await transporter.sendMail({
      from: '"Contacth 👻" <contacth@97.network>',
      to: email,
      subject: "Please verify your email ✔",
      text: `Hi ${firstName}! Please click this link to verify your email: https://contacth.herokuapp.com/auth/confirm/${token}`,
      html: `<b>Hi ${firstName}! Please click this link to verify your email: https://contacth.herokuapp.com/auth/confirm/${token}</b>`
    });
    console.log("Message sent!", info.messageId);
  }

  const newUser = new User({
    email: email,
    password: hashPass,
    confirmationCode: token,
    confirmedEmail: false,
  });

  const newContact = new Contact({
    firstName: firstName,
    lastName: lastName
  });

  if (!req.recaptcha.error) {
    Promise.all([newUser.save(), newContact.save()])
    .then(dbRes => {
      User
        .findByIdAndUpdate(dbRes[0]._id, {profile: dbRes[1]._id})
        .then(() => {
          Contact
            .findByIdAndUpdate(dbRes[1]._id, {owner: dbRes[0]._id})
            .then(() => {
              res.redirect("/");
              sendConfirmationEmail();
            })
        })
    })
    .catch(err => {
      res.render("auth/signup", {message: "Error signing up the user"});
    })
  } else {
    res.render("auth/recaptcha-error")
  }
})

router.get("/confirm/:confirmationCode", (req,res,next) => {
  User.findOne({confirmationCode: req.params.confirmationCode})
  .then(dbRes => {
    if(dbRes !== null) {
      User.findByIdAndUpdate(dbRes._id, {confirmedEmail: true}, {new: true})
        //TODO: "This email has already been confirmed"; "Sorry, this confirmation link timed out. Click here to resend the email"
        .then(res.render("auth/confirmed-email"))
    }
  })
  .catch(err => {console.log(err)})
})

router.get("/login", (req, res, next) => {
  res.render("auth/login", {"message": req.flash("error")});
});

router.post("/login", (req, res, next) => {
  const user = req.body;
  

  if (!user.email || !user.password) {
    req.flash("error", "Wrong credentials");
    return res.redirect("/auth/login");
  }

  User
    .findOne({email: user.email})
    .then(dbRes => {
      activeUser = dbRes._id
      console.log(activeUser);
      
      if (!dbRes) {
        req.flash("error", "Wrong credentials");
        return res.redirect("/auth/login");
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        const { _doc: clone } = { ...dbRes };

        delete clone.password;

        req.session.currentUser = clone;
        if(dbRes.confirmedEmail) {
          return res.redirect("/contacts");
        } else {
          return res.render("auth/unconfirmed-email")
        }
      } else {
        req.flash("error", "Wrong credentials");
        return res.redirect("/auth/login");
      }
    })
    .catch(next);
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
