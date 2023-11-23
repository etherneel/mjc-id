const express = require("express");

const router = express.Router();

const transactions = require("./transactions");
const claimRequest = require("./claim_request");
const users = require("./users");


router.use("/transactions", transactions);
router.use("/claimRequest", claimRequest);
router.use("/users", users);

// router.use('/wallet', require('./wallet_address'));

module.exports = router;
