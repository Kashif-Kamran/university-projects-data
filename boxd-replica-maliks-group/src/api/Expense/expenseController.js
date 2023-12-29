const ErrorHandler = require('../../utils/errorHandler');
const expenseRepository = require('./expenseRepository');
module.exports.addNewExpense = async (expenseData,userId) =>
{
    if (!expenseData || !expenseData.amount || expenseData.amount < 0 || !expenseData.date)
    {
        throw new ErrorHandler('Please Must Send Required Fields',400);
    }
    // Check if amount is a number
    if (typeof expenseData.amount !== 'number')
    {
        throw new ErrorHandler('Amount must be a valid number',400);
    }

    let date = new Date(expenseData.date);

    // Check if date is a valid date object
    if (isNaN(date.getTime()))
    {
        throw new ErrorHandler('Please Send a Valid Date',400);
    }
    return await expenseRepository.saveNewExpense(expenseData,userId);
};

module.exports.getExpensesByUserId = async (userId,pgNo) =>
{
    let expenses = await expenseRepository.getExpansesByUserId(userId);
    return expenses;

}

module.exports.deleteExpense = async (expenseId) =>
{
    if (!expenseId)
    {
        throw new ErrorHandler("Expense Id Not Found",400);
    }
    return await expenseRepository.deleteExpenseById(expenseId);
}

module.exports.updateExpense = async (expenseId,expenseData) =>
{
    console.log(expenseData);
    if (!expenseData || !expenseData.amount || expenseData.amount < 0 || !expenseData.date)
    {
        throw new ErrorHandler('Please Must Send Required Fields',400);
    }
    // Check if amount is a number
    if (typeof expenseData.amount !== 'number')
    {
        throw new ErrorHandler('Amount must be a valid number',400);
    }

    let date = new Date(expenseData.date);

    // Check if date is a valid date object
    if (isNaN(date.getTime()))
    {
        throw new ErrorHandler('Please Send a Valid Date',400);
    }
    return await expenseRepository.updateExpense(expenseId,expenseData);
}

//  Delete Expense