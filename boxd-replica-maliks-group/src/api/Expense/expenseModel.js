const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: [0,'Amount cannot be negative']
        },
        description: {
            type: String,
            default: ''
        },
        supplier: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Expense',expenseSchema);

