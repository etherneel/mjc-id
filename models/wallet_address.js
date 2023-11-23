const mongoose = require('mongoose');

const walletAddressSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true,
    },
    address: {
        type: String,
        unique: true,
    },
    referedBy:{
        type: String,
    },
    referral:{
        type: String,
    }
});

// async function generateUserId(model) {
//     const count = await model.countDocuments({});
//     return count + 1;
// }
async function generateUserId(model) {
    const highestUser = await model.findOne({}, { user_id: 1 })
        .sort({ user_id: -1 })
        .exec();

    if (highestUser) {
        return highestUser.user_id + 1;
    } else {
        // If no documents exist in the collection, start with user_id 1
        return 1;
    }
}


walletAddressSchema.pre('save', async function (next) {
    if (!this.user_id) {
        this.user_id = await generateUserId(this.constructor);
    }
    next();
});

module.exports = mongoose.model('Wallet', walletAddressSchema);
