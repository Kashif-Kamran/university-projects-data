const UserModel = require('./userModel');
const ErrorHandler = require('../../utils/errorHandler');
const mongoose = require('mongoose');

module.exports.saveNewUser = async (userInfo) =>
{
    const checkUser = await UserModel.findOne({ email: userInfo.email });
    if (checkUser)
    {
        throw new ErrorHandler('Email Already In Use',400);
    }
    const newUser = new UserModel(userInfo);
    await newUser.save();
    return newUser;
}

module.exports.getUserByEmail = async (email) =>
{
    const user = await UserModel.findOne({ email: email });
    return user ? user : null;
}

module.exports.getUserById = async (id) =>
{
    if (!mongoose.Types.ObjectId.isValid(id))
    {
        throw new ErrorHandler('Invalid User ID',400);
    }
    const user = await UserModel.findOne({ _id: id });
    return user ? user : null;
}

module.exports.softDelete = async (userId) =>
{
    if (!mongoose.Types.ObjectId.isValid(userId))
    {
        throw new ErrorHandler('User Not Found',404);
    }
    const updateResponse = await UserModel.updateOne(
        { _id: userId,isDeleted: false }, // Query condition
        { $set: { isDeleted: true } }      // Update
    );

    if (updateResponse.modifiedCount === 0)
    {
        throw new ErrorHandler('User Not Found',404);
    }
    return updateResponse;
}

module.exports.updateUser = async (user) =>
{
    let updateResponse = user.save();
    return updateResponse;
}