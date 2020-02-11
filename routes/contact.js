const express = require("express");
const router = express.Router();
const User = require("../models/User");
const contactModel = require("../models/Contact");
const uploader = require("./../config/cloudinary");
// const protectRoute = require("../middlewares/protectRoute");

router.get("/contact-create", (req, res) => {
    res.render("contacts/contact-create");
});

router.post("/contact-create",uploader.single("avatar"), (req, res, next) => {
    console.log(req.body);
    
      const { firstName, lastName, secondaryEmails, phoneNumbers, ethAddresses, streetName, streetNumber, special, postCode, city, country, principalResidency, googleId, twitterId, githubId, avatar } = req.body;
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
            // avatar
        })
        .then(() => {
            req.flash("success", "contact successfully created");
            res.redirect("/contacts");
        })
        .catch(next);
});

module.exports = router;
