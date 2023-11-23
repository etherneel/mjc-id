const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const randomstring = require('randomstring');


const purchaseHistorySchema = new mongoose.Schema({

    user_referral:{
        type:String,
    },
    amountSpent:{
        type:Number,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
    
    
 

});
module.exports = mongoose.model("PurchaseHistory", purchaseHistorySchema)