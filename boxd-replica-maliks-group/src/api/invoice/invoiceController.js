const repository = require('./invoiceRepository');
const ErrorHandler = require('../../utils/errorHandler');

// Function to add a new invoice
async function addInvoice(invoiceData) {
    try {
        const result = await repository.addInvoice(invoiceData);
        return result;
    } catch (error) {
        console.error('Error in addInvoice controller:', error); 
        throw new ErrorHandler('Error adding invoice', 500);
    }
}

// Function to update an existing invoice
async function updatedInvoice(invoiceId, updatedInvoiceData) {
    try {
        const result = await repository.updateInvoice(invoiceId, updatedInvoiceData);
        return result;
    } catch (error) {
        throw new ErrorHandler('Error updating invoice', 500);
    }
}

// Function to retrieve an invoice by its ID
async function getByInvoiceId(invoiceId) {
    try {
        const foundInvoice = await repository.getByInvoiceId(invoiceId);
        return foundInvoice;
    } catch (error) {
        throw new ErrorHandler('Error getting invoice by ID', 500);
    }
}

// Function to retrieve invoices by user ID
async function getInvoiceByUserId(userId) {
    try {
        const userInvoices = await repository.getInvoiceByUserId(userId);
        return userInvoices;
    } catch (error) {
        throw new ErrorHandler('Error getting invoices by userId', 500);
    }
}

// Function to delete an invoice by its ID
async function deleteInvoice(invoiceId) {
    try {
        const deletedInvoice = await repository.deleteInvoice(invoiceId);
        return deletedInvoice;
    } catch (error) {
        throw new ErrorHandler('Error deleting invoice', 500);
    }
}

// Exporting all functions as a module
module.exports = {
    addInvoice,
    updatedInvoice,
    getByInvoiceId,
    getInvoiceByUserId,
    deleteInvoice,
}