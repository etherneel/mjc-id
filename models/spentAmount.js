const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const randomstring = require('randomstring');


const amountSpentSchema = new mongoose.Schema({

    user_referral:{
        type:String,
        unique:true
    },
    amountSpent:{
        type:Number,
        default:0
    },
    created_at:{
        type:Date,
        default:Date.now
    }
    
    
 

});
module.exports = mongoose.model("AmountSpentReferral2", amountSpentSchema)