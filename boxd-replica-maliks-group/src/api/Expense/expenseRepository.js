const ExpenseModel = require('./expenseModel');
const mongoose = require('mongoose');
const ErrorHandler = require('../../utils/errorHandler');
module.exports.saveNewExpense = async (expenseData,userId) =>
{
    if (!mongoose.Types.ObjectId.isValid(userId))
    {
        throw new ErrorHandler('Invalid User ID',400);
    }
    const expense = new ExpenseModel({
        date: expenseData.date,
        amount: expenseData.amount,
        description: expenseData.description,
        supplier: expenseData.supplier,
        userId: userId
    });

    return await expense.save();
}

module.exports.getExpansesByUserId = (userId) =>
{
    if (!mongoose.Types.ObjectId.isValid(userId))
    {
        throw new ErrorHandler('Invalid User ID',400);
    }
    return ExpenseModel.find();
}

module.exports.deleteExpenseById = async (expenseId) =>
{
    if (!mongoose.Types.ObjectId.isValid(expenseId))
    {
        throw new ErrorHandler('Invalid Expense Id',400);
    }
    let deletionResposne = await ExpenseModel.deleteOne({ _id: expenseId });
    if (deletionResposne.deletedCount === 0)
    {
        throw new ErrorHandler('Expense Not Found',404);
    }
    return deletionResposne;
}

module.exports.updateExpense = async (expenseId,expenseData) =>
{
    console.log("expense ID: ",expenseId)
    if (!mongoose.Types.ObjectId.isValid(expenseId))
    {
        throw new ErrorHandler('Invalid Expense Id',400);
    }
    let updateResponse = await ExpenseModel.updateOne(
        { _id: expenseId }, // Query condition
        { $set: { date: expenseData.date,amount: expenseData.amount,description: expenseData.description,supplier: expenseData.supplier } }      // Update
    );
    if (updateResponse.modifiedCount === 0)
    {
        throw new ErrorHandler('Expense Not Found',404);
    }
    return updateResponse;
}