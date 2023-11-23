const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const randomstring = require('randomstring');
const Wallet = require("./wallet_address")

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: false,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    referedBy: {
        type: String,
        required: true,
    },
    referral: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        unique: false
    },
    wallet_address:{
        type:String,
        ref:"Wallet",
        unique:true
    }
 

});

userSchema.pre('save', async function (next) {
    if (!this.referral) {
        // Generate a new referral key with a fixed prefix 'E6' and 6 random alphanumeric characters
        const referralKey = `E6${randomstring.generate({
            length: 6,
            charset: 'numeric',
        })}`;

        this.referral = referralKey;
        if (!this.id) {
            this.id = await generateUserId(this.constructor);
            console.log("this-----", this)
        }
    }

    next();
});



// async function generateUserId(model) {
//     const count = await model.countDocuments({});
//     return count + 1;
// }
async function generateUserId(model) {
    try {
        const highestUser = await model.findOne({}, {}, { sort: { id: -1 } }); // Find the document with the highest ID
        const highestID = highestUser ? highestUser.id : 0; // If there are no users, set the highestID to 0
        return highestID + 1; // Increment the highest ID by 1 for the new user
    } catch (error) {
        console.error('Error in generateUserId:', error);
        throw error;
    }
}


userSchema.plugin(uniqueValidator);
/*userSchema.pre('save', async function (next) {
    console.log("this.id",this.id)
    if (!this.id) {
        this.id = await generateUserId(this.constructor);
        console.log("this.id in if",this.id)
        console.log("this.id in if",this)
    }
    next();
});*/

module.exports = mongoose.model('User', userSchema);
