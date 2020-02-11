const express = require("express");
const router = express.Router();
const User = require("../models/User");
const contactModel = require("../models/Contact");
const uploader = require("./../config/cloudinary");
require("./auth");
// import activeUser from "auth.js"

// const protectRoute = require("../middlewares/protectRoute");
// console.log(activeUser);


router.get("/contact-create", (req, res) => {
    res.render("contacts/contact-create");
});

router.post("/contact-create",uploader.single("avatar"), (req, res, next) => {
    console.log(req.body);
    
      const { firstName, lastName, secondaryEmails, phoneNumbers, ethAddresses, streetName, streetNumber, special, postCode, city, country, principalResidency, googleId, twitterId, githubId, avatar } = req.body;
      if (req.file) avatar = req.file.url;
    contactModel
        .create({
            firstName,
            lastName,
            secondaryEmails,
            phoneNumbers,
            ethAddresses,
            streetName,
            streetNumber,
            special,
            postCode,
            city,
            country,
            principalResidency: principalResidency === "yes",
            googleId,
            twitterId,
            githubId,
            avatar,
            user : activeUser
        })
        .then(() => {
            req.flash("success", "contact successfully created");
            res.redirect("/contacts");
        })
        .catch(next);
});


router.get("/contact/:id", (req, res, next) => {
    contactModel
      .findById(req.params.id)
      .then(contact => {
        res.render("contacts/contact-page", { contact });
      })
      .catch(next);
  });


  router.get("/contacts/contact-edit/:id", (req, res, next) => {
    contactModel
      .findById(req.params.id)
      .then(contact => {
        res.render("contacts/contact-edit", { contact });
      })
      .catch(next);
  });


module.exports = router;
