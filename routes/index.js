const express = require('express');
const router = express.Router();
const contactModel = require("../models/Contact");
const User = require("../models/User");
const protectRoute = require("../middlewares/protectRoute");

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/eth', (req, res, next) => {
  res.render('eth/signTest');
});

router.get("/contacts", protectRoute, (req, res, next) => {
  Promise.all([contactModel.find({user : req.session.currentUser._id}),User.findById(req.session.currentUser._id)])
    .then(dbResults => {
      res.render("contacts/contact-list", {
        contacts: dbResults[0],
        user:dbResults[1]
      });
    })
    .catch(next);
});

module.exports = router;
