const express = require('express');
const router = express.Router();
const contactModel = require("../models/Contact");
const User = require("../models/User");

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/contacts", (req, res, next) => {
  contactModel
    .find({user : req.session.currentUser._id}) 
    .then(dbResults => {
      res.render("contacts/contact-list", {
        contacts: dbResults
      });
    })
    .catch(next);
});

module.exports = router;
