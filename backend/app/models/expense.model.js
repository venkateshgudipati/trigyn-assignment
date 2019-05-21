const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExpenseSchema = mongoose.Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    amount: Number,
    description: String,
    date: String
}, {
        timestamps: true
    });
// ExpenseSchema.pre('aggregate', function (docs, next) {
//     // This will **not** run because the below example uses a
//     // cursor.
//     console.log('post aggregate');
//     next();
// });


module.exports = mongoose.model('Expense', ExpenseSchema);
