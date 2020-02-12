const express = require("express");
const router = express.Router();
const User = require("../models/User");
const contactModel = require("../models/Contact");
const uploader = require("./../config/cloudinary");
require("./auth");

router.get("/user/:id", (req, res, next) => {
  User
    .findById(req.session.currentUser._id)
    .then(user => {
      res.render("profile/user-profile", { user });
    })
    .catch(next);
});

router.get("/user/profile-edit/:id", (req, res, next) => {
  User
    .findById(req.session.currentUser._id)
    .then(user => {
      res.render("profile/profile-edit", { user });
    })
    .catch(next);
});




module.exports = router;