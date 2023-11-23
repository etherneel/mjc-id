"use strict";
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ReferModelSchema = new mongoose.Schema({
  id: {
    type: Number,
    primaryKey:True,
  },
  user:[
      {type:mongoose.Schema.Types.ObjectId, ref:'User'}
  ],
  createdAt: {
      type: Date,
      default: Date.now,
  },
});
module.exports = mongoose.model("ReferModel", ReferModelSchema);