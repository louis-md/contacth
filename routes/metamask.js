// const express      = require("express");
// const router       = express.Router();
// const Eth          = require('ethjs');
// const Web3         = require("web3");

// const User = require("../models/User");
// // const connectMetamask = require("../middlewares/connectMetamask")
// // const signMessage = require("../middlewares/signMessage");

// router.get("/", (req, res, next) => {
//     const provider = req.query.provider;
//     const web3 = new Web3(provider || 'ws://https://rinkeby.infura.io/v3/64993d48570a48b0af9f82188134ee2e');
//     var eth = new Eth(web3.currentProvider);
//     console.log("metamask route used");
//     console.log(req.query.msg)
//     console.log(req.query.from)
//     const msg = req.query.msg;
//     const from = req.query.from;
//     return eth.personal_sign(msg, from)
// })

// // router.get("/",(req, res, next) => {
// //     const msg = req.params.msg;
// //     const signed = req.params.signed;
// //     return eth.personal_sign(msg, from)
// // })

// module.exports = router;