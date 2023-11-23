const express = require('express');
const router = express.Router();
const WalletAddress = require('../models/wallet_address');

router.post('/address', async (req, res) => {
    try {
        const { address, referedBy, referral } = req.body;
        const existingAddress = await WalletAddress.findOne({ address });
        if (existingAddress) {
            return res.status(400).json({ message: 'Address already registered' });
        }
        const walletAddress = new WalletAddress({ address, referedBy, referral });
        await walletAddress.save();
        res.status(201).json({ message: 'Wallet address created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the wallet address' });
    }
});

router.get('/address/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const walletAddress = await WalletAddress.findOne({ address });
        if (!walletAddress) {
            return res.status(404).json({ error: 'Wallet address not found' });
        }
        res.json({ user_id: walletAddress.user_id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving the user_id' });
    }
});


router.get('/user_id/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const walletAddress = await WalletAddress.findOne({ user_id });
        if (!walletAddress) {
            return res.status(404).json({ error: 'User Id address not found' });
        }
        res.json({ address: walletAddress.address });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving the user_id' });
    }
});

router.get('/address', async (req, res) => {
    try {
        const address = await WalletAddress.find();
        res.status(200).json(address);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch Wallet Address' });
    }
});
module.exports = router;

router.post("/get-user-id", async(req, res) => {
    try {
        // Get the address from the request body
        const { address } = req.body;
       
        // Find the WalletAddress model with the provided address
        const existingAddress = await WalletAddress.findOne({ address });


        if (!existingAddress) {
            return res.status(404).json({ error: 'Wallet address not found' });
        }

        let userIdCounter = 1; // Initialize with a default value

        const highestUser = await WalletAddress.find({}, { user_id: 1, _id: 0 })
            .sort({ user_id: -1 })
            .limit(1)
            .exec();

        if (highestUser.length > 0) {
            userIdCounter = highestUser[0].user_id + 1;
        }
        
        // Create highest user id 
        const highestUserId = highestUser[0].user_id + 1

       

        // Update the user_id in the existing WalletAddress model
        existingAddress.user_id = highestUserId;

        // Save the updated model to the database
        await existingAddress.save();

        // Respond with the generated user_id
        res.status(201).json({ user_id: highestUserId, "updated":existingAddress.user_id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while generating/updating the user_id' });
    }
});


router.get("/highest", async (req, res) => {
    try {
        let userIdCounter = 1; // Initialize with a default value

        const highestUser = await WalletAddress.find({}, { user_id: 1, _id: 0 })
            .sort({ user_id: -1 })
            .limit(1)
            .exec();

        if (highestUser.length > 0) {
            userIdCounter = highestUser[0].user_id + 1;
        }

        // Return the updated userIdCounter value in the response
        return res.json({
            highest: userIdCounter
        });
    } catch (err) {
        // Handle any errors
        console.error(err);
        return res.status(500).json({ error: "An error occurred while fetching the highest user ID." });
    }
});

module.exports = router
