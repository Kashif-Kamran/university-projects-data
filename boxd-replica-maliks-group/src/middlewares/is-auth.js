const ErrorHandler = require('../utils/errorHandler');
const userController = require('../api/Account/userController');
const jwtUtils = require('../utils/jwt.util');
module.exports = async (req,res,next) =>
{
    try
    {
        const token = req.header("Authorization") ? req.header("Authorization").split(" ")[1] : undefined
        if (token === undefined)
        {
            next(new ErrorHandler("Not Authenticated : Token Not Found",401));
            return;
        }
        let userId = jwtUtils.verifyToken(token);
        const validUser = await userController.getUserById(userId._id);
        if (!validUser)
        {
            throw new ErrorHandler("Not Authenticated : User Not Found",401);
        }
        req.user = validUser;
        next();
    }
    catch (err)
    {
        if (err instanceof ErrorHandler)
        {
            next(err);
            return;
        }
        next(new ErrorHandler("Internal Error Occured While Token Verification",401));
    }
}
