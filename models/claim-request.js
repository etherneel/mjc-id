"use strict";
const mongoose = require("mongoose");


const claimRequestSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    account: {
        type: String,
    },
    email: {
        type: String,
    },
    amount: {
        type: Number,
    },
    isApproved:{
      type: Boolean
    },
    txid: {
        type: String,
        trim: true,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    approvedBy:{
        type: String
    }
});
module.exports = mongoose.model("ClaimRequest", claimRequestSchema);

