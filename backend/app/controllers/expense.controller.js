const Expense = require('../models/expense.model.js');
// Create and Save a new Expense
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userId && !req.body.amount && !req.body.description && !req.body.date) {
        return res.status(400).send({
            message: "Expense body is required"
        });
    }
    // Create a Expense
    const expenseEntry = new Expense({
        userId: req.body.userId,
        amount: req.body.amount,
        date: req.body.date,
        description: req.body.description
    });

    // Save Expense in the database
    expenseEntry.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Expense."
            });
        });
};

// Retrieve and return all Expense from the database.
exports.findAll = (req, res) => {
    Expense.find().populate('userId')
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving expenses."
            });
        });
};

// Find a single expense with a expenseId
exports.findOne = (req, res) => {
    Expense.findById(req.params.expenseId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Expense not found with id " + req.params.expenseId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Expense not found with id " + req.params.expenseId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Expense with id " + req.params.expenseId
            });
        });
};

// // Update a expense identified by the expenseId in the request
// exports.update = (req, res) => {

// };

// Delete a expense with the specified expenseId in the request
exports.delete = (req, res) => {
    Expense.findByIdAndRemove(req.params.Expense)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Expense not found with id " + req.params.Expense
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Expense not found with id " + req.params.Expense
                });
            }
            return res.status(500).send({
                message: "Could not delete Expense with id " + req.params.Expense
            });
        });
};