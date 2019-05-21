module.exports = (route) => {
    const report = require('../controllers/report.controller.js');

     // Create a new expense
     route.get('/report', report.report);
     route.get('/expenseSummary', report.summaryExpenses);
}