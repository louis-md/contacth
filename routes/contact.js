const express = require("express");
const router = express.Router();
const User = require("../models/User");
const contactModel = require("../models/Contact");
const uploader = require("./../config/cloudinary");
require("./auth");
// const protectRoute = require("../middlewares/protectRoute");

router.get("/contact-create", (req, res) => {
  res.render("contacts/contact-create");
  console.log(req.session);
});


router.post("/contact-create", uploader.single("avatar"), (req, res, next) => {
  console.log(req.body);

  const { firstName, lastName, secondaryEmails, phoneNumbers, ethAddresses, streetName, streetNumber, special, postCode, city, country, principalResidency, googleId, twitterId, githubId } = req.body;
  if (req.file) avatar = req.file.url;
  else avatar = "https://cdn.onlinewebfonts.com/svg/img_258083.png";
  contactModel
    .create({
      firstName,
      lastName,
      secondaryEmails,
      phoneNumbers,
      ethAddresses,
      postalAddresses: [{
        streetName,
        streetNumber,
        special,
        postCode,
        city,
        country,
        principalResidency: principalResidency === "yes"
      }],
      googleId,
      twitterId,
      githubId,
      avatar,
      user: req.session.currentUser._id
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

router.post("/contacts/contact-edit/:id", uploader.single("avatar"), (req, res, next) => {
  const { firstName, lastName, secondaryEmails, phoneNumbers, ethAddresses, streetName, streetNumber, special, postCode, city, country, principalResidency, googleId, twitterId, githubId } = req.body;
  if (req.file) avatar = req.file.url;
  else avatar = "https://cdn.onlinewebfonts.com/svg/img_258083.png";

  contactModel
    .findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      secondaryEmails,
      phoneNumbers,
      ethAddresses,
      postalAddresses: [{
        streetName,
        streetNumber,
        special,
        postCode,
        city,
        country,
        principalResidency: principalResidency === "yes"
      }],
      googleId,
      twitterId,
      githubId,
      avatar,
      user: req.session.currentUser._id
    })
    .then(() => {
      res.redirect("/contacts")
    })
    .catch(err => console.log(err));
});

module.exports = router;
