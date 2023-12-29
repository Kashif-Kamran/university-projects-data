const Router = require('express').Router();
const isAuth = require('../../middlewares/is-auth');
const ErrorHandler = require('../../utils/errorHandler');
const expenseController = require("./expenseController");

/**
 * @swagger
 * /expense:
 *   post:
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     description: Add a new expense.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Expense data.
 *         schema:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *               format: date
 *               description: Date of the expense.
 *               required: true
 *             amount:
 *               type: number
 *               description: Expense amount.
 *               required: true
 *             description:
 *               type: string
 *               description: Description of the expense.
 *               required: true
 *             supplier:
 *               type: string
 *               description: Supplier of the expense.
 *               required: true
 *     responses:
 *       '200':
 *         description: Expense added successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Expense Added Successfully
 *               data: {}  # Example expense data
 *       '401':
 *         description: Unauthorized - Invalid token or authentication failed.
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
Router.post('/',isAuth,async (req,res,next) =>
{
    try
    {
        const expenseData = req.body;
        await expenseController.addNewExpense(expenseData,req.user._id);
        res.send({
            success: true,
            message: 'Expense Added Successfully',
            data: expenseData
        });
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
});

/**
 * @swagger
 * /expense/:
 *   get:
 *     summary: Get paginated expenses for the authenticated user
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pgNo
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       '200':
 *         description: Success response with paginated expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expenses Fetched Successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       amount:
 *                         type: number
 *                         example: 100
 *                       description:
 *                         type: string
 *                         example: Grocery shopping
 *                   example:
 *                     - amount: 100
 *                       description: Grocery shopping
 *                     - amount: 50
 *                       description: Gas bill
 *       '400':
 *         description: Bad request or invalid page number
 *       '401':
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal Server Error - Request Failed
 */

Router.get('/',isAuth,async (req,res,next) =>
{
    try
    {
        const pgNo = Number(req.query.pgNo) || 1;
        console.log(pgNo);
        const expenses = await expenseController.getExpensesByUserId(req.user._id,pgNo);
        // perform pagination where each page should have 10 records
        let pageSize = 10;
        let totalPages = Math.ceil(expenses.length / pageSize);
        if (pgNo > totalPages || pgNo < 1)
        {
            throw new ErrorHandler('Page Not Found',400);
        }
        // perform pagination where each page should have 10 records
        let startIndex = (pgNo - 1) * pageSize;
        let endIndex = pgNo * pageSize;
        let paginatedExpense = expenses.slice(startIndex,endIndex);

        res.send({
            success: true,
            message: 'Expenses Fetched Successfully',
            data: paginatedExpense
        });
    }
    catch (error)
    {

        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error)
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
});


/**
 * @swagger
 * /expense/{id}:
 *   delete:
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     description: Delete an expense by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the expense to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Expense deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Expense Deleted Successfully
 *       '401':
 *         description: Unauthorized - Invalid token or authentication failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       '404':
 *         description: Expense not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Expense Not Found
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */
Router.delete('/:id',isAuth,async (req,res,next) =>
{
    try
    {
        const expenseId = req.params.id;
        const expenseDeleteResponse = await expenseController.deleteExpense(expenseId);
        res.send({
            success: true,
            message: 'Expense Deleted Successfully',
        });
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error)
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
});

/**
 * @swagger
 * /expense/{id}:
 *   put:
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     description: Update an expense by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the expense to update.
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Updated expense data.
 *         schema:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *               format: date
 *               description: New date of the expense.
 *             amount:
 *               type: number
 *               description: New expense amount.
 *             description:
 *               type: string
 *               description: New description of the expense.
 *             supplier:
 *               type: string
 *               description: New supplier of the expense.
 *     responses:
 *       '200':
 *         description: Expense updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Expense Updated Successfully
 *               data: {}  # Example updated expense data
 *       '401':
 *         description: Unauthorized - Invalid token or authentication failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       '404':
 *         description: Expense not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Expense Not Found
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed
 */
Router.put('/:id',isAuth,async (req,res,next) =>
{
    try
    {
        const expenseId = req.params.id;
        const expenseData = req.body;
        const expenseUpdateResponse = await expenseController.updateExpense(expenseId,expenseData);
        res.send({
            success: true,
            message: 'Expense Updated Successfully',
            data: expenseUpdateResponse
        });
    }
    catch (error)
    {
        if (error instanceof ErrorHandler)
        {
            next(error);
            return;
        }
        console.log(error)
        next(new ErrorHandler('Internal Server Error - Request Failed',500));
    }
})

module.exports = Router;


// const expense = {
//     "date": "2021-01-01",
//     "amount": 100,
//     "description": "Test Expense",
//     "supplier": "Test Supplier"
// };