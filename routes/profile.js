const express = require("express");
const router = express.Router();
const User = require("../models/User");
const contactModel = require("../models/Contact");
const uploader = require("./../config/cloudinary");
require("./auth");
const protectUserRoute = require("../middlewares/protectUserRoute");
const protectRoute = require("../middlewares/protectRoute");
var scripts = [{ script: "/javascripts/script2.js" }];

router.get("/user/profile", protectRoute, (req, res, next) => {
  User
    .findById(req.session.currentUser._id)
    .populate("profile")
    .then(user => {
      res.render("profile/user-profile", { user });
    })
    .catch(next);
});

router.get("/user/profile-edit", protectRoute, (req, res, next) => {
  User
    .findById(req.session.currentUser._id)
    .populate("profile")
    .then(user => {
      res.render("profile/profile-edit", {
        user,
        scripts: scripts
      })
    })
    .catch(next);
});

router.post("/user/profile-edit/:id", uploader.single("avatar"), (req, res, next) => {
  const { firstName, lastName, secondaryEmails, phoneNumbers, ethAddresses, streetName, streetNumber, special, postCode, city, country, principalResidency, googleId, twitterId,facebookId, githubId } = req.body;

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
          socialAccounts: {
            googleId,
            twitterId,
            facebookId,
            githubId
          },
          avatar,
          user: req.session.currentUser._id
        }, { new: true }), User.findById(req.session.currentUser._id).populate("profile")])

        .then(dbResult => {

          res.render("profile/user-profile", {
            contact: dbResult[0],
            user: dbResult[1]
          });
        })
        .catch(err => console.log(err));
    })
    .catch(next);
});




module.exports = router;