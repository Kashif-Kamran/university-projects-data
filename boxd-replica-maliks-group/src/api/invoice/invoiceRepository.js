const Invoice = require('./invoiceSchema');
const ErrorHandler = require('../../utils/errorHandler');

// Function to add a new invoice
async function addInvoice(invoice) {
    try {
        const newInvoice = new Invoice({
            ...invoice,
        });

        const savedInvoice = await newInvoice.save();
        return savedInvoice;
    } catch (error) {
        console.error('Error in addInvoice repository:', error);
        throw new ErrorHandler('Error adding invoice', 500);
    }
}

// Function to update an existing invoice by ID
async function updateInvoice(invoiceId, updatedInvoiceData) {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, updatedInvoiceData, { new: true });
        return updatedInvoice;
    } catch (error) {
        throw new ErrorHandler('Error updating invoice', 500);
    }
}

// Function to retrieve an invoice by its ID
async function getByInvoiceId(invoiceId) {
    try {
        const foundInvoice = await Invoice.findOne({ _id: invoiceId });
        return foundInvoice;
    } catch (error) {
        throw new ErrorHandler('Error getting invoice by ID', 500);
    }
}

// Function to retrieve invoices by user ID
async function getInvoiceByUserId(userId) {
    try {
        const userInvoices = await Invoice.find({ UserId: userId });
        return userInvoices;
    } catch (error) {
        throw new ErrorHandler('Error getting invoices by user ID', 500);
    }
}

// Function to delete an invoice by its ID
async function deleteInvoice(invoiceId) {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
        return deletedInvoice;
    } catch (error) {
        throw new ErrorHandler('Error deleting invoice', 500);
    }
}

// Exporting all functions as a module
module.exports = {
    addInvoice,
    updateInvoice,
    getByInvoiceId,
    getInvoiceByUserId,
    deleteInvoice,
};