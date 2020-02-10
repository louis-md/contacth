const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const nodemailer = require("nodemailer");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  if (email === "" || password === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }

  User.findOne({email}, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "This email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    const newUser = new User({
      email: email,
      password: hashPass,
      firstName: firstName,
      confirmationCode: token,
      confirmedEmail: false,
    });

    newUser.save()
    .then(() => {
      User.findOne({email: email})
      .then(dbRes => {
        const newContact = new Contact({
          owner: dbRes._id,
        });
        newContact.save();
        return dbRes;
      })
      // .then(dbRes => {
      //   console.log(`Ceci est un console log: dbRes._id= ${dbRes._id}`);
        // Contact.findOne({owner: `"${dbRes._id}"`}).then(retrievedContact => {
        //   console.log(`Ceci est un console log: nous avons retrouvé le contact ${retrievedContact}`);
        //   User.findByIdAndUpdate(dbRes._id, {$set: {profile: retrievedContact._id}})
        // })
      // })
      res.redirect("/");

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
        
        console.log(`Ceci est un console log. Le transporteur est ${transporter}`)
        let info = await transporter.sendMail({
          from: '"Contacth 👻" <contacth@97.network>',
          to: email,
          subject: "Please verify your email ✔",
          text: `Hi ${firstName}! Please click this link to verify your email: http://localhost:3000/auth/confirm/${token}`,
          html: `<b>Hi ${firstName}! Please click this link to verify your email: http://localhost:3000/auth/confirm/${token}</b>`
        });
        console.log("Message sent: %s", info.messageId);
      }

      sendConfirmationEmail();
    })
    .catch(err => {
      res.render("auth/signup", {message: "Something went wrong signing up the user"});
    })
  });
});

router.get("/confirm/:confirmationCode", (req,res,next) => {
  User
  .findOne({confirmationCode: req.params.confirmationCode})
  .then(dbRes => {
    console.log(`Ceci est un console log. dbRes est ${dbRes}`)
    if(dbRes !== null) {
      User
        .findByIdAndUpdate(dbRes._id, {$set: {confirmedEmail: true}});
    }
    res.render("/auth/confirmed-email");
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
      if (!dbRes) {
        req.flash("error", "Wrong credentials");
        return res.redirect("/auth/login");
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        const { _doc: clone } = { ...dbRes };

        delete clone.password;

        req.session.currentUser = clone;
        return res.redirect("/contacts");
      } else {
        req.flash("error", "Wrong credentials");
        return res.redirect("/auth/login");
      }
    })
    .catch(next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
