module.exports = (route) => {
    const expenses = require('../controllers/expense.controller.js');

    // Create a new expense
    route.post('/expenses', expenses.create);

    // Retrieve all expenses
    route.get('/expenses', expenses.findAll);

    // Retrieve a single Expense with expenseId
    route.get('/expenses/:expenseId', expenses.findOne);

    // // Update a User with userId
    // route.put('/expenses/:expenseId', users.update);

    // Delete a Expense with expenseId
    route.delete('/expenses/:expenseId', expenses.delete);
}
