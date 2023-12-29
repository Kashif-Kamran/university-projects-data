const receiptRepository = require('./receiptRepository');
// path="/api/receipt/"
module.exports.createNewReceipt = async (receiptBody) =>
{
    return await receiptRepository.createNewReceipt(receiptBody);
}
module.exports.findReceiptByID = (id) =>
{
    return receiptRepository.findbyId(id)
    .then((result) => {
        return(result);
    })
}
module.exports.findReceiptByUserID = (userId) =>
{
    return receiptRepository.findbyUserId(userId)
    .then((result) => {
        return(result);
    })
}
module.exports.updateReceipt= (id, receiptBody) =>
{
    return receiptRepository.updateReceipt(id, receiptBody)
    .then((result) => {
        return(result);
    })
}

