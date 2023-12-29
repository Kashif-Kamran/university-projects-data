const express = require('express');
const controller = require('./invoiceController');
const ErrorHandler = require('../../utils/errorHandler');
const app = express.Router();
const isAuth = require('../../middlewares/is-auth');

/**
 * @swagger
 * /invoice/:
 *   post:
 *     tags:
 *       - Invoice
 *     description: Add a New Invoice.
 *     security:
 *       - bearerAuth: []  # Require Bearer token authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Added Invoice Details.
 *         schema:
 *            type: object
 *            properties:
 *               InvoiceStates:
 *                 type: Number
 *               DatePaid:
 *                 type: Date
 *               DueDate:
 *                 type: Date
 *               IssuePaid:
 *                 type: Date
 *               LastUpdated:
 *                 type: Date
 *               IssueDate:
 *                 type: Date
 *               Description: 
 *                 type: String
 *               TotalAmount:
 *                 type: Number
 *               Job:
 *                 type: String
 *               ClientName:
 *                 type: String
 *               ClientEmail:
 *                 type: String
 *               IsStripeEnable:
 *                 type: Boolean
 *               InvoiceJobs:
 *                 type: array
 *     responses:
 *       '200':
 *         description: Invoice created successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Successfully! Created Invoice.
 *               data: {}  # Example user data
 *       '400':
 *         description: Bad Request - Missing required fields or invalid data.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad Request - Missing required fields or invalid data.
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed.
 */

// Endpoint to add a new invoice
app.post("/", isAuth, async function (req, res) {
    try {
        const authenticatedUserId = req.user._id;

        const invoiceData = req.body;

        invoiceData.UserId = authenticatedUserId;

        const result = await controller.addInvoice(invoiceData);

        res.status(200).send({
            success: true,
            message: 'Successfully! Created Invoice.',
            data: result
        });

    } catch (error) {
        console.error('Error in Creating Invoice:', error);
        const errorMessage = error instanceof ErrorHandler ? error.message : 'Internal Server Error - Request Failed';
        return res.status(error.statusCode || 400).send(errorMessage);
    }
});

/**
 * @swagger
 * /invoice/{invoiceId}:
 *   put:
 *     tags:
 *       - Invoice
 *     description: Update Existing Invoice
 *     security:
 *       - bearerAuth: []  # Require Bearer token authentication
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         description: Invoice to be updated
 *         schema:
 *           type: string
 *           properties:
 *               id: 
 *                 type: String
 *               InvoiceStates:
 *                 type: Number
 *               InvoiceState: 
 *                 type: String
 *               InvoiceNumber:
 *                 type: String
 *               DatePaid:
 *                 type: Date
 *               DueDate:
 *                 type: Date
 *               IssuePaid:
 *                 type: Date
 *               IssueDate:
 *                 type: Date
 *               Description:
 *                 type: String
 *               TotalAmount:
 *                 type: Number
 *               Job:
 *                 type: String
 *               ClientName:
 *                 type: String
 *               ClientEmail:
 *                 type: String
 *               ClientPhone: 
 *                 type: String
 *               IsStripeEnable:
 *                 type: Boolean
 *               Add1: 
 *                 type: String
 *               Add2: 
 *                 type: String
 *               Add3: 
 *                 type: String
 *               Add4: 
 *                 type: String
 *               Postcode:
 *                 type: String
 *               PaymentTerms: 
 *                 type: String
 *               PurchaseOrderNumber: 
 *                 type: String
 *               AdditionalInformation: 
 *                 type: String
 *               Notes: 
 *                 type: String
 *               NetAmount: 
 *                 type: Number
 *               Vat: 
 *                 type: Number
 *               LastUpdated:
 *                 type: Date
 *               Deleted: 
 *                 type: Boolean
 *               InvoiceJobs:
 *                 type: Array
 *     responses:
 *       '200':
 *         description: Invoice updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Successfully updated the invoice.
 *               data: {}  # Example user data
 *       '400':
 *         description: Bad Request - Missing required fields or invalid data.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Bad Request - Missing required fields or invalid data.
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed.
 */

// Endpoint to update an existing invoice
app.put("/:invoiceId", isAuth, async function (req, res) {
    try {
        const invoiceId = req.params.invoiceId;
        const updatedInvoiceData = req.body;

        const result = await controller.updatedInvoice(invoiceId, updatedInvoiceData);

        res.status(200).send({
            success: true,
            message: 'Successfully! Updated Invoice.',
            data: result
        });

    } catch (error) {
        console.error("Error in Updating Invoice", error);
        const errorMessage = error instanceof ErrorHandler ? error.message : 'Internal Server Error - Request Failed';
        return res.status(error.statusCode || 400).send(errorMessage);
    }
});

/**
 * @swagger
 * /invoice/{invoiceId}:
 *   get:
 *     tags:
 *       - Invoice
 *     description: Get an invoice by its ID.
 *     security:
 *       - bearerAuth: []  # Require Bearer token authentication
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         description: ID of the invoice to retrieve.
 *         schema:
 *           type: string
 *           example: "64e858cf0492351e2337657f"
 *     responses:
 *       '200':
 *         description: Invoice retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Successfully retrieved the invoice.
 *               data:
 *                 id: "64e858cf0492351e2337657f"
 *                 InvoiceStates: 10
 *                 InvoiceState: "overDue"
 *                 InvoiceNumber: "12345"
 *                 DatePaid: "2021-04-15"
 *                 DueDate: "2021-04-15"
 *                 IssuePaid: "2021-04-15"
 *                 LastUpdated: "2021-04-15"
 *                 IssueDate: "2021-04-15"
 *                 Description: "Hello Test"
 *                 TotalAmount: 22
 *                 Job: "Test"
 *                 ClientName: "Abrar Test Bamboo API Testing"
 *                 ClientEmail: "Abrar.ali+BambooApiTest@wearenova.co.uk"
 *                 ClientPhone: "0333-1111111"
 *                 IsStripeEnable: true
 *                 Add1: "hello1"
 *                 Add2: "hello2"
 *                 Add3: "hello3"
 *                 Add4: "hello4"
 *                 Postcode: "3400"
 *                 PaymentTerms: "card"
 *                 PurchaseOrderNumber: "05"
 *                 AdditionalInformation: "kkk"
 *                 Notes: "kkk"
 *                 NetAmount: 0.00
 *                 Vat: 0.00
 *                 Deleted: false
 *                 InvoiceJobs: ["64e70b9338a1ce691cd2823f"]
 *       '404':
 *         description: Invoice ID not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invoice ID not found.
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed.
 */

// Endpoint to get an invoice by its ID
app.get("/:invoiceId", isAuth, async function (req, res) {
    try {
        const invoiceId = req.params.invoiceId;
        console.log("invoice id :", invoiceId);
        const foundInvoice = await controller.getByInvoiceId(invoiceId);

        if (!foundInvoice) {
            return res.status(404).json({ message: 'Invoice ID not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Successfully! Get Invoice by InvoiceId.',
            data: foundInvoice
        });

    } catch (error) {
        console.error("Error in Getting Invoice by Id", error);
        const errorMessage = error instanceof ErrorHandler ? error.message : 'Internal Server Error - Request Failed';
        return res.status(error.statusCode || 400).send(errorMessage);
    }
})

/**
 * @swagger
 * /invoice/:
 *   get:
 *     tags:
 *       - Invoice
 *     description: Get invoices for the logged-in user.
 *     security:
 *       - bearerAuth: []  # Require Bearer token authentication
 *     responses:
 *       '200':
 *         description: User invoices retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Successfully retrieved user invoices.
 *               data:
 *                   _id: "64e858cf0492351e2337657f"
 *                   InvoiceStates: 10
 *                   InvoiceState: "overDue"
 *                   InvoiceNumber: "12345"
 *                   DatePaid: "2021-04-15"
 *                   DueDate: "2021-04-15"
 *                   IssuePaid: "2021-04-15"
 *                   LastUpdated: "2021-04-15"
 *                   IssueDate: "2021-04-15"
 *                   Description: "Hello Test"
 *                   TotalAmount: 22
 *                   Job: "Test"
 *                   ClientName: "Abrar Test Bamboo API Testing"
 *                   ClientEmail: "Abrar.ali+BambooApiTest@wearenova.co.uk"
 *                   ClientPhone: "0333-1111111"
 *                   IsStripeEnable: true
 *                   Add1: "hello1"
 *                   Add2: "hello2"
 *                   Add3: "hello3"
 *                   Add4: "hello4"
 *                   Postcode: "3400"
 *                   PaymentTerms: "card"
 *                   PurchaseOrderNumber: "05"
 *                   AdditionalInformation: "kkk"
 *                   Notes: "kkk"
 *                   NetAmount: 0.00
 *                   Vat: 0.00
 *                   Deleted: false
 *                   InvoiceJobs: ["64e70b9338a1ce691cd2823f"]
 *              
 *       '404':
 *         description: User invoices not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User invoices not found.
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed.
 */

// Endpoint to get invoices for the logged-in user
app.get("/", isAuth, async function (req, res) {
    try {
        const loggedInUserId = req.user._id;
        console.log("LOGGEDIN USER ID:", loggedInUserId);

        const userInvoices = await controller.getInvoiceByUserId(loggedInUserId);
        console.log("USER INVOICES", userInvoices);

        if (!userInvoices || userInvoices.length === 0) {
            return res.status(404).json({ message: 'User invoices not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Successfully! Get Invoice/Invoices after user logged In.',
            data: userInvoices
        });

    } catch (error) {
        console.error("Error in Getting Invoice/Invoices after user loggedIn", error);
        const errorMessage = error instanceof ErrorHandler ? error.message : 'Internal Server Error - Request Failed';
        return res.status(error.statusCode || 400).send(errorMessage);
    }
});

/**
 * @swagger
 * /invoice/{invoiceId}:
 *   delete:
 *     tags:
 *       - Invoice
 *     description: Delete an invoice by ID.
 *     security:
 *       - bearerAuth: []  # Require Bearer token authentication
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         description: ID of the invoice to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Invoice deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Successfully deleted the invoice.
 *       '404':
 *         description: Invoice not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invoice not found.
 *       '500':
 *         description: Internal Server Error - Request Failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error - Request Failed.
 */

// Endpoint to delete an invoice by its ID
app.delete("/:invoiceId", isAuth, async function (req, res) {
    try {
        const invoiceId = req.params.invoiceId;
        const deletedInvoice = await controller.deleteInvoice(invoiceId);

        if (!deletedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Successfully! Deleted Invoice',
        });
    } catch (error) {
        console.error("Error in Deleting Invoice by InvoiceId", error);
        const errorMessage = error instanceof ErrorHandler ? error.message : 'Internal Server Error - Request Failed';
        return res.status(error.statusCode || 400).send(errorMessage);
    }
});

module.exports = app;