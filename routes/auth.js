const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

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

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "This email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email: email,
      password: hashPass,
      firstName: firstName,
    });

    newUser.save()
      .then(() => {
        User.findOne({ email: email }).then(dbRes => {
          const newContact = new Contact({
            owner: dbRes._id,
          });
          newContact.save();
          return dbRes;
        })
          .then(dbRes => {
            Contact.findOne({ owner: dbRes._id }).then(retrievedContact => {
              User.findByIdAndUpdate(dbRes._id, { profile: retrievedContact._id })
            })
          })
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong signing up the user" });
      })
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    req.flash("error", "Wrong credentials");
    return res.redirect("/auth/login");
  }

  User
    .findOne({ email: user.email })
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
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
