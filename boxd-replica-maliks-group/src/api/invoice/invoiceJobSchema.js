// invoiceJobSchema.js
const mongoose = require('mongoose');

const invoiceJobSchema = new mongoose.Schema({
  Description: String,
  Amount: Number
});

const InvoiceJob = mongoose.model('InvoiceJob', invoiceJobSchema);

async function getInvoiceJobIdsByDescriptions(descriptions) {
  const jobs = await InvoiceJob.find({ Description: { $in: descriptions } });
  return jobs.map(job => job._id);
}

module.exports = {
  InvoiceJob,
  getInvoiceJobIdsByDescriptions
};
