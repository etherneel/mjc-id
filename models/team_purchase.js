"use strict";
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const teamPurchaseSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  txid: {
      type: String,
  },
  amount: {
      type: Number,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
});
module.exports = mongoose.model("TeamPurchase", teamPurchaseSchema);
