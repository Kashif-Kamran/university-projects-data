const Router = require('express').Router();
const receiptController = require('./receiptController');
const ErrorHandler = require('../../utils/errorHandler');

/**
 * @swagger
 * /receipt:
 *   post:
 *     tags:
 *       - Receipt
 *     summary: Create a new receipt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Add new receipt detail.
 *         schema:
 *           type: object
 *           properties:
 *              userID: 
 *                  type: String,
 *                  required: true
 *              receiptDate:
 *                  type: Date,
 *                  default: "2017-08-09"
 *              description:
 *                  type: String,
 *                  default: 'Testing the receipt'
 *              supplier:
 *                  type: String,
 *                  default: 'Supplier test'
 *              imageFileName:
 *                  type: String,
 *                  default: 'image'
 *              lastUpdated:
 *                  type: Date,
 *                  default: "2017-08-09"
 *              Deleted:
 *                  type: Boolean,
 *                  default: false
 *     responses:
 *      '200':
 *         description: Created Receipt Successfully
 *      '400':
 *         description: Bad Request - Missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Missing Required Fields
 *      '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */

Router.post('/',async (req,res,next) =>
{
    try
    {
        const reqBody = req.body;
        if (!reqBody.userID)
        {
            throw new ErrorHandler('Missing Required Feilds',400);
        }
        let savedReceipt = await receiptController.createNewReceipt(reqBody);
        res.status(200).send({
            success: true,
            message: 'Created Receipt Successfully',
            data: savedReceipt
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
 * /receipt/{id}:
 *   get:
 *     tags:
 *       - Receipt
 *     summary: Get a receipt by id
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           type: string
 *     responses:
 *      '200':
 *         description: Found Receipt with given id .
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Found Receipt with id
 *               data:
 *                 _id: "id"
 *                 userID": "userId"
 *                 description": "Testing the receipt update"
 *                 supplier": "Supplier test"
 *                 imageFileName": "Image"
 *                 Deleted": false
 *                 receiptDate": "2023-08-23T04:15:13.931Z"
 *                 lastUpdated": "2023-08-23T04:15:13.932Z"
 *               # ... other user properties
 *      '400':
 *         description: Bad Request - Missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Missing Required Fields
 *      '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */

Router.get('/:id',async (req,res,next) =>
{
    try
    {
        const reqBody = req.params;
        if (!reqBody.id)
        {
            throw new ErrorHandler('Missing Required Feilds',400);
        }
        let foundReceipt = await receiptController.findReceiptByID(reqBody.id);
        res.status(200).send({
            success: true,
            message: 'Found Receipt by id',
            data: foundReceipt
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
 * /receipt?userid={userId}:
 *   get:
 *     tags:
 *       - Receipt
 *     summary: Get a list of receipts for a user with userid
 *     parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           type: string
 *     responses:
 *      '200':
 *         description: Found Receipts with given userId .
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Found Receipts with given userId
 *               data:
 *                 _id: "id"
 *                 userID: "userId"
 *                 description": "Testing the receipt update"
 *                 supplier": "Supplier test"
 *                 imageFileName": "Image"
 *                 Deleted": false
 *                 receiptDate": "2023-08-23T04:15:13.931Z"
 *                 lastUpdated": "2023-08-23T04:15:13.932Z"
 *               # ... other user properties
 *      '400':
 *         description: Bad Request - Missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Missing Required Fields
 *      '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */
 
Router.get('',async (req,res,next) =>
{
    try
    {
        const reqBody = req.query;
        if (!reqBody.userid)
        {
            throw new ErrorHandler('Missing Required Feilds',400);
        }
        let foundReceipt = await receiptController.findReceiptByUserID(reqBody.userid);
        res.status(200).send({
            success: true,
            message: 'Found Receipts for the user',
            data: foundReceipt
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
 * /receipt/{id}:
 *   put:
 *     tags:
 *       - Receipt
 *     summary: Update receipt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: recite id.
 *       - in: body
 *         name: body
 *         required: true
 *         description: receipt detail.
 *         schema:
 *           type: object
 *           properties:
 *              receiptDate:
 *                  type: Date,
 *                  default: "2017-08-09"
 *              description:
 *                  type: String,
 *                  default: 'Testing the receipt'
 *              supplier:
 *                  type: String,
 *                  default: 'Supplier test'
 *              imageFileName:
 *                  type: String,
 *                  default: 'image'
 *              lastUpdated:
 *                  type: Date,
 *                  default: "2017-08-09"
 *              Deleted:
 *                  type: Boolean,
 *                  default: false
 *     responses:
 *      '200':
 *         description: Updated Receipt Successfully
 *      '400':
 *         description: Bad Request - Missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Missing Required Fields
 *      '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */

Router.put('/:id',async (req,res,next) =>
{
    try
    {
        const id = req.params.id;
        const reqBody = req.body;
        if (!id)
        {
            throw new ErrorHandler('No id found',400);
        }
        let foundReceipt = await receiptController.updateReceipt(id, reqBody);
        res.status(200).send({
            success: true,
            message: 'Found Receipts for the user',
            data: foundReceipt
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