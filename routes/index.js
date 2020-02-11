const express = require('express');
const router = express.Router();
const contactModel = require("../models/Contact");
const User = require("../models/User");

router.get('/', (req, res, next) => {

  res.render('index');
});

router.get("/contacts", (req, res, next) => {
  
  
  User
    .find() // retreive all the documents in the artists collection
    .then(dbResults => {
      res.render("contacts/contact-list", {
        user: dbResults
      });
    })
    .catch(next);
});




module.exports = router;
