const User = require('../models/user.model.js');
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email && !req.body.name) {
        return res.status(400).send({
            message: "User body is required"
        });
    }
    // Create a User
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {

    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving User with id " + req.params.userId
            });
        });
};

// // Update a user identified by the userId in the request
// exports.update = (req, res) => {

// };

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.userId
            });
        });
};