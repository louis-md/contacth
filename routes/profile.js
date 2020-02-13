const express = require("express");
const router = express.Router();
const User = require("../models/User");
const contactModel = require("../models/Contact");
const uploader = require("./../config/cloudinary");
require("./auth");

router.get("/user/:id", (req, res, next) => {
  User
    .findById(req.session.currentUser._id)
    .populate("profile")
    .then(user => {
      res.render("profile/user-profile", { user });
    })
    .catch(next);
});

router.get("/user/profile-edit/:id", (req, res, next) => {
  User
    .findById(req.session.currentUser._id)
    .populate("profile")
    .then(user => {
      res.render("profile/profile-edit", { user });
    })
    .catch(next);
});

router.post("/user/profile-edit/:id", uploader.single("avatar"), (req, res, next) => {
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