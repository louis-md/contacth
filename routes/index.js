const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/contacts", (req, res) => {
  res.render("contacts/contact-list");
});

module.exports = router;
