const ErrorHandler = require('../../utils/errorHandler');
const ReceiptrModel = require('./receiptModel');

module.exports.createNewReceipt = async (receiptBody) =>
{
    const newReceipt = new ReceiptrModel(receiptBody);
    await newReceipt.save();
    return newReceipt;
}
module.exports.findbyId = async (id) => {
    return ReceiptrModel.findById(id)
    .then((result) => {
        return result;
    })
    .catch((err) => {
        throw new ErrorHandler(err,400);
    })
}
module.exports.findbyUserId = async (userId) => {
    return ReceiptrModel.find({userID: userId})
    .then((result) => {
        return result;
    })
    .catch((err) => {
        throw new ErrorHandler(err,400);
    })
}
module.exports.updateReceipt = async ( id, body) => {
    const receipt = await ReceiptrModel.findById(id);
    if (receipt){
    return ReceiptrModel.updateOne({_id : (receipt._id)}, {$set : body})
    .then(result => {
      return result
    }) 
    .catch(err => {
        throw new ErrorHandler(err,400);
    })
   }
     else {
        throw new ErrorHandler('receipt not found',400);
     }
}
