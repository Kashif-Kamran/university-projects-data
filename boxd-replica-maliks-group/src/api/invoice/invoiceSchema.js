const mongoose = require('mongoose');
const { InvoiceJob } = require('./invoiceJobSchema');

// Define the main invoice schema
const invoiceSchema = new mongoose.Schema({
  id: String,  // An identifier for the invoice
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User",  // Reference to the User model
    required: true
  },
  InvoiceStates: Number,
  InvoiceState: String,
  IssueDate: Date,
  DatePaid: Date,
  IssuePaid: Date,
  InvoiceNumber: String,
  Description: String,
  Job: String,
  ClientName: String,
  ClientEmail: String,
  ClientPhone: String,
  Add1: String,
  Add2: String,
  Add3: String,
  Add4: String,
  Postcode: String,
  PaymentTerms: String,
  DueDate: Date,
  PurchaseOrderNumber: String,
  AdditionalInformation: String,
  Notes: String,
  NetAmount: Number,
  Vat: Number,
  TotalAmount: Number,
  LastUpdated: Date,
  Deleted: Boolean,
  IsStripeEnable: Boolean,
  InvoiceJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvoiceJob'
    }
  ]
});

// Create a model using the invoice schema
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Export the Invoice model
module.exports = Invoice;
