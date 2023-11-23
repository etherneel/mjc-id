const express = require("express");
const router = express.Router();
const ClaimRequest = require('../models/claim-request');
const User = require("../models/users");
const {successResponse} = require("../middleware/response");
const transactions = require("../models/transactions");


router.get("/getAll", async (req, res) => {
    try {
        const count = await ClaimRequest.countDocuments({});
        const perPage = 10
        let page = req.query.page || 1;
        let data = await ClaimRequest.find().limit(perPage)
            .skip(perPage * (page-1))
        //const claimRequest = await ClaimRequest.find();
        //res.status(200).json(claimRequest);
        return successResponse(res, {
            message: "claims get successfully",
            results: data,
            totalCount:count,
            page: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

router.post("/addClaim", async (req, res) => {
    const { email, account, amount,txid } = req.body;
    try{
        const newClaim = new ClaimRequest({
            email, account, amount, txid
        });
        await newClaim.save();
        res.status(201).json({ message: 'Claim Added successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/approveClaim/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const {txid} = req.body;
        const filter = {_id: id}
        const update = {isApproved:true, txid}
        const data = await ClaimRequest.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        res.status(200).json({ message: 'Claim Approved successfully' , data});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
