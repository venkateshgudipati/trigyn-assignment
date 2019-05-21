module.exports = (route) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User
    route.post('/users', users.create);

    // Retrieve all Users
    route.get('/users', users.findAll);

    // Retrieve a single User with userId
    route.get('/users/:userId', users.findOne);

    // // Update a User with userId
    // route.put('/users/:userId', users.update);

    // Delete a User with userId
    route.delete('/users/:userId', users.delete);
}
