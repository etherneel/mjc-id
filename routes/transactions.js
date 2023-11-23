const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactions");
const User = require('../models/users');
const Transactions = require("../models/transactions");
const ClaimRequest = require("../models/claim-request");

router.post("/toadmin", (req, res) => {
  return transactionsController.transactions.transactionsDone(req, res);
});

router.post("/gettotal", (req, res) => {
  return transactionsController.transactions.gettotaltransactions(req, res);
});

router.get("/getTotalAmount", (req, res) => {
  return transactionsController.transactions.getAll(req, res);
});
router.get("/getAllTransactions", (req, res) => {
  return transactionsController.transactions.getAllTransactions(req, res);
});

router.get("/purchase/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const referredUsers = await User.find({ referedBy: user.referral });

    // Extract the ids from referredUsers
    const referredUserIds = referredUsers.map(user => user.id);

    // Find transactions where userId is in the referredUserIds array
    const teamTransactions = await Transactions.find({ id: { $in: referredUserIds } });

    const selfTransaction = await Transactions.find({ id: user.id });
    const totalTeamAmount = teamTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalSelfAmount = selfTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalAmount = totalSelfAmount + totalTeamAmount;
    let reward = 0;

    if (totalAmount >= 1000 && totalAmount < 5000) {
      reward = totalAmount * 0.05;
    } else if (totalAmount >= 5000 && totalAmount < 10000) {
      reward = totalAmount * 0.06;
    } else if (totalAmount >= 10000) {
      reward = totalAmount * 0.075;
    }
    const haveclaim = await ClaimRequest.findOne({email: user?.email, txid: null})

    const data = {
      id: user.id,
      email: user.email,
      referral: user.referral,
      referedBy: user.referedBy,
      referrals: referredUsers,
      teamTransactions: teamTransactions,
      selfTransaction: selfTransaction,
      totalSelfAmount: totalSelfAmount,
      totalTeamAmount: totalTeamAmount,
      totalAmount: totalAmount,
      reward: reward || 8,
      anyClaimPending :  !!haveclaim
    }
    res.status(200).json(data);
} catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while retrieving the user_id' });
}
});
module.exports = router;
