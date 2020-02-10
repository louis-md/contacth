const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const protectRoute = require("../middlewares/protectRoute");

router.get("/contact-create", (req, res) => {
    res.render("contacts/contact-create");
});

module.exports = router;
