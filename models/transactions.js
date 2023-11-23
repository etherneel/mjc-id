"use strict";
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

mongoose.Promise = global.Promise;

const Transactions = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    accounts: {
      type: String,
      trim: true,
      required: true
    },
    txid: {
      type: String,
      trim: true,
      required: true
    },
    amount: {
      type: Number,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true,
  }
);
module.exports =  mongoose.models.Transactions  || mongoose.model("Transactions", Transactions);
