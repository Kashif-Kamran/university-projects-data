const Router = require('express').Router();
const userController = require('./userController');
const ErrorHandler = require('../../utils/errorHandler');
const isAuth = require('../../middlewares/is-auth');
const EmailService = require("../../services/EmailService");

/**
 * @swagger
 * /user/:
 *   delete:
 *     tags:
 *       - Account
 *     description: This .
 *     security:
 *       - bearerAuth: []  # Require Bearer token authentication
 *     responses:
 *       '200':
 *         description: User account deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User Deleted
 *               data:
 *                 _id: "user_id"
 *                 companyName: "Company Inc."
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "john@example.com"
 *                 isDeleted: true
 *                 # ... other user properties
 *       '401':
 *         description: Unauthorized - Bearer token missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */


Router.delete("/",isAuth,async (req,res,next) =>
{
    try
    {
        const user = await userController.softDelete(req.user._id);
        res.status(200).send({
            success: true,
            message: 'User Deleted',
            data: user
        });
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error);
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
});


/**
 * @swagger
 * /user/:
 *   get:
 *     tags:
 *       - Account
 *     description: Get user's profile.
 *     security:
 *       - bearerAuth: []  # Require Bearer token authentication
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User Found
 *               data:
 *                 _id: "user_id"
 *                 companyName: "Company Inc."
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "john@example.com"
 *                 telephone: "123-456-7890"
 *                 add1: "123 Main St"
 *                 add2: "Apt 456"
 *                 postcode: "12345"
 *                 subscriptionStatus: "Active"
 *                 displayEmail: "john@example.com"
 *               # ... other user properties
 *       '401':
 *         description: Unauthorized - Bearer token missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */


Router.get("/",isAuth,async (req,res,next) =>
{
    try
    {
        const user = await userController.getUserById(req.user._id);

        user.password = undefined;
        user.isDeleted = undefined;
        user.updatedAt = undefined;
        user.isSuspended = undefined;

        res.status(200).send({
            success: true,
            message: 'User Found',
            data: user
        });
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error);
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
});

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - Account
 *     description: Register a new user.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User Registraction Details.
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               required: true
 *             lastName:
 *               type: string
 *               required: true
 *             email:
 *               type: string
 *               required: true
 *             password:
 *               type: string
 *               required: true
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User Registered Successfully
 *               data: {}  # Example user data
 *       '400':
 *         description: Bad Request - Missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Missing Required Fields
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */


Router.post('/register',async (req,res,next) =>
{
    try
    {
        const reqBody = req.body;
        if (!reqBody.firstName || !reqBody.lastName || !reqBody.email || !reqBody.password || reqBody.password.length < 8)
        {
            throw new ErrorHandler('Missing Required Feilds',400);
        }
        let savedUser = await userController.register(reqBody);
        res.status(200).send({
            success: true,
            message: 'User Registered Successfully',
            data: savedUser
        });
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error);
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
});


/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - Account
 *     description: Authenticate user and generate an access token.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User login details.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               required: true
 *             password:
 *               type: string
 *               required: true
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *         headers:
 *           Authorization:
 *             description: Bearer token for authentication.
 *             type: string
 *       '400':
 *         description: Bad Request - Missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Missing Required Fields
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */

Router.post('/login',async (req,res,next) =>
{
    try
    {
        const reqBody = req.body;
        if (!reqBody.email || !reqBody.password || reqBody.password.length < 8)
        {
            throw new ErrorHandler('Missing Required Feilds',400);
        }
        let token = await userController.getLoginToken(reqBody);
        res.header('Authorization',`Bearer ${token}`)

        res.status(200).send({
            success: true,
            message: 'User Logged In Successfully',
            data: token
        })
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error);
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
});


/**
 * @swagger
 *  /user/update-password:
 *   put:
 *     tags:
 *       - Account
 *     description: Update user's password.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User's current and new password.
 *         schema:
 *           type: object
 *           properties:
 *             currentPassword:
 *               type: string
 *               required: true
 *             newPassword:
 *               type: string
 *               required: true
 *     security:
 *       - bearerAuth: []  # Require Bearer token authentication
 *     responses:
 *       '200':
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Password Updated Successfully
 *               data: {}  # Example response data
 *       '400':
 *         description: Bad Request - Invalid password or missing fields.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: New and Current Password length should be 8 at least
 *       '401':
 *         description: Unauthorized - Bearer token missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */

Router.put("/update-password",isAuth,async (req,res,next) =>
{
    try
    {
        const reqBody = req.body;
        console.log(reqBody.currentPassword.length);
        if (!reqBody.newPassword || !reqBody.currentPassword || reqBody.newPassword.length < 8 || reqBody.currentPassword.length < 8)
        {
            throw new ErrorHandler('New and Current Password length should be 8 atleast',400);
        }
        const response = await userController.updatePassword(req.user._id,reqBody.currentPassword,reqBody.newPassword);
        res.status(200).send({
            success: true,
            message: 'Password Updated Successfully',
            data: response
        })
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error);
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
});


/**
 * @swagger
 * /user/forget-password:
 *   get:
 *     tags:
 *       - Account
 *     description: Request a password reset token via email.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User's email address to send the reset token.
 *     responses:
 *       '200':
 *         description: Email sent successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Email Sent Successfully
 *               data: {}  # Example response data
 *       '400':
 *         description: Bad Request - Invalid email or missing fields.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Valid email is required
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */

Router.get('/forget-password',async (req,res,next) =>
{

    try
    {
        console.log(req.query)
        const email = req.query.email;
        if (!email)
        {
            throw new ErrorHandler("Coultn't find email in Request Body",400);
        }

        let token = await userController.getResetPasswordToken(email);
        // Token is send via email address
        EmailService.sendEmail(email,"BoxD (Forget Password Token)",`Your Reset Password Token is \n'${token}'\n`);
        res.status(200).send({
            success: true,
            message: 'Email Send Successfully',
            data: {}
        })
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error);
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
});

/**
 * @swagger
 * /user/forget-password:
 *   post:
 *     tags:
 *       - Account
 *     summary: Reset forgotten password
 *     description: Reset forgotten password using a valid token and new password.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: The token for password reset.
 *             newPassword:
 *               type: string
 *               description: The new password to be set.
 *           required:
 *             - token
 *             - newPassword
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: Password Updated Successfully
 *             data:
 *               type: object  # You can specify the data structure here if you have one
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/Error'
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       status:
 *         type: integer
 */


Router.post('/forget-password',async (req,res,next) =>
{
    try
    {
        // validate email and token weather they are valid or not
        if (!req.body.token || !req.body.newPassword)
        {
            throw new ErrorHandler("Valid password and token are required",400);
        }
        // check weather the token is valid or not
        let response = await userController.resetForgettonPassword(req.body.token,req.body.newPassword);
        // if valid then update the password
        res.status(200).send({
            success: true,
            message: 'Password Updated Successfully',
            data: response
        });
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error);
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }

});


Router.put("/",isAuth,async (req,res,next) =>
{
    try
    {
        const reqBody = req.body;
        const user = await userController.updateUser(req.user._id,reqBody);
        res.status(200).send({
            success: true,
            message: 'User Updated Successfully',
            data: user
        });
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error);
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }

});

module.exports = Router;