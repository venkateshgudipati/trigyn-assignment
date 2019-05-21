const Expense = require('../models/expense.model.js');
const User = require('../models/user.model.js');


exports.report = (req, res) => {
    User.find({}, { __v: 0 })
        .then(users => {
            var userCount = users.length;
            Expense.aggregate([
                { $group: { _id: "_id", total: { $sum: "$amount" } } },
            ]).then(ex => {
                console.log(ex)
                res.status(200).json({
                    userCount: userCount,
                    totalExpenses:ex[0].total
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while reading user count."
            });
        });
}
exports.summaryExpenses= (req,res)=>{

    Expense.aggregate([
        { $group: { _id: "$userId", total: { $sum: "$amount" } } },
    ]).then(ex=>{
        res.send(ex);
    })
}