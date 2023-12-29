const jwt = require('jsonwebtoken');
const config = require('../config/config');
const ErrorHandler = require('./errorHandler');

// Function to genrate Token
module.exports.generateToken = function (signAbleToken,expireDuration = config.JWT_EXPIRE)
{
    if (!signAbleToken)
    {
        throw new ErrorHandler('Missing Identification Token',400);
    }

    try
    {
        const token = jwt.sign(
            {
                _id: signAbleToken,
            },
            config.JWT_SECRET,
            {
                expiresIn: expireDuration,
            }
        );
        return token;
    } catch (error)
    {
        throw new ErrorHandler('Token generation failed',500);
    }
}

// Function to verify Token
module.exports.verifyToken = function (token)
{
    if (!token)
    {
        throw new ErrorHandler('Token missing',401);
    }

    try
    {
        const decoded = jwt.verify(token,config.JWT_SECRET);
        return decoded;
    } catch (error)
    {
        if (error.name === 'TokenExpiredError')
        {
            throw new ErrorHandler('Token expired',401);
        } else if (error.name === 'JsonWebTokenError')
        {
            throw new ErrorHandler('Invalid token',401);
        } else
        {
            throw new ErrorHandler('Token verification failed',500);
        }
    }
}
