const { ObjectId } = require("mongodb");
const {
  successResponse,
  badRequestResponse,
  errorResponse,
  notFoundResponse,
} = require("../middleware/response");
const transactions = require("../models/transactions");
const User = require("../models/users");

exports.transactions = {
  transactionsDone: async (req, res) => {
    try {
      const id = req.body.id;
      console.log("---id----",id)
      const findUser = await User.findOne({ id });
      if (!findUser) {
          return res.status(400).json({ message: 'User Does not exist!!' });
      }
      let data = {
        id: req.body.id,
        accounts: req.body.accounts,
        txid: req.body.txid,
        amount: req.body.amount,
      };
      console.log(data);
      const isCreated = await transactions(data).save();
      return successResponse(res, {
        message: "transactions have been sent successfully",
      });
    } catch (error) {
      return errorResponse(error, res);
    }
  },
  gettotaltransactions: async (req, res) => {
    try {
      let data = await transactions.aggregate([
        {
          $match: {
            accounts: req.body.accounts,
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$amount" // Replace `amount` with the actual field you want to calculate the sum for
            }
          }
        }
      ])
      return successResponse(res, {
        message: "transactions get successfully",
        data: data,
      });
    } catch (error) {
      return errorResponse(error, res);
    }
  },
   getAll: async (req, res) => {
    try {
      let data = await transactions.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$amount" // Replace `amount` with the actual field you want to calculate the sum for
            }
          }
        }
      ])
      return successResponse(res, {
        message: "transactions get successfully",
        data: data,
      });
    } catch (error) {
      return errorResponse(error, res);
    }
  },
  getAllTransactions: async (req, res) => {
    const count = await transactions.countDocuments({});
   let perPage = 10
    let page = req.query.page || 1;
    try {
      let data = await transactions.find().limit(perPage)
          .skip(perPage * (page-1))
      let results = [];
      for(transaction of data){
        var tmpTransaction = transaction.toObject();
        const user = await User.findOne({ id: tmpTransaction?.id });
        tmpTransaction.user = user;
        results.push({...tmpTransaction})
      }
      return successResponse(res, {
        message: "transactions get successfully",
        results,
        totalCount:count,
        page: page
      });
    } catch (error) {
      return errorResponse(error, res);
    }
   /* var page = parseInt(req.query.page) || 0; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 3;
    var query = {};
    transactions.find(query)
        .sort({ update_at: -1 })
        .skip(page * limit) //Notice here
        .limit(limit)
        .exec((err, doc) => {
          if (err) {
            return res.json(err);
          }
          transactions.estimatedDocumentCount(query).exec((count_error, count) => {
            if (err) {
              return res.json(count_error);
            }
            return res.json({
              total: count,
              page: page,
              pageSize: doc.length,
              results: doc
            });
          });
        });*/
  },
  // usertransactions: async (req, res) => {
  //   try {
  //     if (req.headers.authorization) {
  //       let { err, decoded } = await tokenverify(
  //         req.headers.authorization.split(" ")[1]
  //       );
  //       if (err) {
  //         notFoundResponse(res, {
  //           message: "user not found",
  //         });
  //       }
  //       const user = await findOneRecord(userdata, {
  //         _id: decoded.profile._id,
  //       });
  //       if (decoded) {
  //         if (user) {
  //           const isCreated = await transactions.find({
  //             UserID: decoded.profile._id,
  //           });
  //           return successResponse(res, {
  //             message: "transactions get successfully",
  //             data: isCreated,
  //           });
  //         } else {
  //           badRequestResponse(res, {
  //             message: "do not have access for admin panal",
  //           });
  //         }
  //       }
  //     } else {
  //       badRequestResponse(res, {
  //         message: "No token provided.",
  //       });
  //     }
  //   } catch (error) {
  //     return errorResponse(error, res);
  //   }
  // },
  // priceBNB: async (req, res) => {
  //   try {
  //     await updateRecord(
  //       Pricemodal,
  //       {},
  //       {
  //         BNBprice: req.body.BNBprice,
  //       }
  //     );
  //     return successResponse(res, {
  //       message: "Price chenge successfully",
  //     });
  //   } catch (error) {
  //     return errorResponse(error, res);
  //   }
  // },
  // priceUSDT: async (req, res) => {
  //   try {
  //     await updateRecord(
  //       Pricemodal,
  //       {},
  //       {
  //         BUSDTprice: req.body.BUSDTprice,
  //       }
  //     );
  //     return successResponse(res, {
  //       message: "Price chenge successfully",
  //     });
  //   } catch (error) {
  //     return errorResponse(error, res);
  //   }
  // },
  // getallPrice: async (req, res) => {
  //   try {
  //     let data = await Pricemodal.find({});
  //     return successResponse(res, {
  //       message: "Price chenge successfully",
  //       data: data,
  //     });
  //   } catch (error) {
  //     return errorResponse(error, res);
  //   }
  // },
};
