const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const randomstring = require('randomstring');


const rewardsSchema = new mongoose.Schema({

    user_referral:{
        type:String,
        unique:true
    },
    reward:{
        type:Number,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
    
    
 

});
module.exports = mongoose.model("RewardsUpdated", rewardsSchema)