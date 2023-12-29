const userRepository = require('./userRepository');
const ErrorHandler = require('../../utils/errorHandler');
const jwtUtils = require('../../utils/jwt.util');
// path="/api/user/register"
module.exports.register = async (userInfo) =>
{
    return await userRepository.saveNewUser(userInfo);
}

module.exports.getLoginToken = async (userInfo) =>
{
    const user = await userRepository.getUserByEmail(userInfo.email);
    if (!user || user.isDeleted)
    {
        throw new ErrorHandler('Invalid Credentials',401);
    }
    const isMatch = await user.comparePassword(userInfo.password);
    if (!isMatch)
    {
        throw new ErrorHandler('Invalid Credentials',401);
    }
    const token = jwtUtils.generateToken(user._id);
    return token;
}

module.exports.getUserById = async (id) =>
{
    const user = await userRepository.getUserById(id);
    if (!user || user.isDeleted)
    {
        throw new ErrorHandler('User Not Found',404);
    }
    return user;
}

module.exports.softDelete = async (userId) =>
{
    const updateResponse = await userRepository.softDelete(userId);
    return updateResponse;
}

module.exports.updatePassword = async (userId,currentPassword,newPassword) =>
{
    const user = await userRepository.getUserById(userId);
    if (!user || user.isDeleted)
    {
        throw new ErrorHandler('User Not Found',404);
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch)
    {
        throw new ErrorHandler("Current Password Didn't Match",401);
    }
    user.password = newPassword;
    return await userRepository.updateUser(user);

}

module.exports.getResetPasswordToken = async (email) =>
{
    const user = await userRepository.getUserByEmail(email);
    if (!user || user.isDeleted)
    {
        throw new ErrorHandler('User Not Found',404);
    }
    const token = jwtUtils.generateToken({ email: user.email,password: user.password },"1h");
    user.forgetPassToken = token;
    await userRepository.updateUser(user);
    return token;
}

module.exports.resetForgettonPassword = async (token,newPassword) =>
{
    if (!token)
    {
        throw new ErrorHandler('Forget Password Token is Missing',400);
    }
    if (!newPassword || newPassword.length < 8)
    {
        throw new ErrorHandler('Password must be at least 8 characters long',400);
    }


    const decoded = jwtUtils.verifyToken(token);
    if (!decoded)
    {
        throw new ErrorHandler('Invalid Password Reseting Token',401);
    }
    let tokenData = decoded._id;
    /*
        email
        password
    */
    let user = await userRepository.getUserByEmail(tokenData.email);
    if (!user || user.isDeleted)
    {
        throw new ErrorHandler('Unable to Reset Password - USER NOT FOUND',404);
    }
    if (user.forgetPassToken !== token)
    {
        throw new ErrorHandler('Invalid Password Reseting Token',401);
    }
    user.password = newPassword;
    user.forgetPassToken = null;
    return await userRepository.updateUser(user);
}

module.exports.updateUser = async (userId,userInfo) =>
{
    if (!userInfo.email || !userInfo.firstName || !userInfo.lastName || !userInfo.companyName || !userInfo.telephone)
    {
        throw new ErrorHandler('Required Values Are Missing',400);
    }

    const user = await userRepository.getUserById(userId);
    if (!user || user.isDeleted)
    {
        throw new ErrorHandler('User Not Found',404);
    }
    user.title = userInfo.title;
    user.firstName = userInfo.firstName;
    user.lastName = userInfo.lastName;
    user.companyName = userInfo.companyName;
    user.telephone = userInfo.telephone;
    return await userRepository.updateUser(user);
}