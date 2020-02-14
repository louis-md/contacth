const express = require("express");
const router = express.Router();
const User = require("../models/User");
const contactModel = require("../models/Contact");
const uploader = require("./../config/cloudinary");
require("./auth");
const protectUserRoute = require("../middlewares/protectUserRoute");
const protectRoute = require("../middlewares/protectRoute");
var scripts = [{ script: "/javascripts/script2.js" }];


router.get("/contact-create", protectRoute, (req, res) => {
  User
    .findById(req.session.currentUser._id)
    .then(dbResults => {
      res.render("contacts/contact-create", { 
        user: dbResults,
        scripts: scripts })
    });
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

router.get("/contact/:id",protectUserRoute, (req, res, next) => {
  Promise.all([contactModel.findById(req.params.id), User.findById(req.session.currentUser._id)])
    .then(dbResults => {
      res.render("contacts/contact-page", {
        contact: dbResults[0],
        user: dbResults[1]
      });
    })
    .catch(next);
});

router.get("/contacts/contact-edit/:id",protectUserRoute, (req, res, next) => {
  Promise.all([contactModel
    .findById(req.params.id), User.findById(req.session.currentUser._id)])
    .then(dbResults => {
      res.render("contacts/contact-edit", {
        contact: dbResults[0],
        user: dbResults[1],
        scripts: scripts
      });
    })
    .catch(next);
});

router.post("/contacts/contact-edit/:id", uploader.single("avatar"), (req, res, next) => {
  const { firstName, lastName, secondaryEmails, phoneNumbers, ethAddresses, streetName, streetNumber, special, postCode, city, country, principalResidency, googleId, twitterId, githubId } = req.body;

  contactModel
    .findById(req.params.id)
    .then(dbRes => {
      let picture = dbRes.avatar;
      if (req.file) avatar = req.file.url;
      else avatar = picture

      Promise.all([contactModel
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
        }, { new: true }), User.findById(req.session.currentUser._id)])
        .then(dbResult => {
          res.render("contacts/contact-page", {
            contact: dbResult[0],
            user: dbResult[1],
          });
        })
        .catch(err => console.log(err));
    })
    .catch(next);
});

router.get("/contacts/contact-delete/:id",protectUserRoute, (req, res, next) => {
  contactModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.redirect("/contacts")
    })
    .catch(next);
});






module.exports = router;
