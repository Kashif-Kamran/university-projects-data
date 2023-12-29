const express = require('express');
const controller = require('./jobTrackingController');
const app = express.Router();
const isAuth = require('../../middlewares/is-auth');
const ErrorHandler = require('../../utils/errorHandler');

// Endpoint to add a new job (protected with isAuth middleware)
app.post("/", isAuth, async function (req, res, next) {
    try {

        const authenticatedJobId = req.user._id;

        const jobData = req.body;

        jobData.UserId = authenticatedJobId;

        const result = await controller.addJob(jobData);

        res.status(200).send({
            success: true,
            message: 'Successfully! Added Job.',
            data: result
        });
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return next(error);
        }

        console.error(error);
        return next(new ErrorHandler('Internal Server Error - Request Failed', 500));
    }
});

// Endpoint to update a job (protected with isAuth middleware)
app.put("/:jobId", isAuth, async function (req, res, next) {
    try {
        const jobId = req.params.jobId;
        const updatedJobData = req.body;

        const result = await controller.updateJob(jobId, updatedJobData);

        res.status(200).send({
            success: true,
            message: 'Successfully! Updated Job.',
            data: result
        });

    } catch (error) {
        if (error instanceof ErrorHandler) {
            return next(error);
        }

        console.error(error);
        return next(new ErrorHandler('Internal Server Error - Request Failed', 500));
    }
});

// Endpoint to get job by its ID
app.get("/:jobId", isAuth, async function (req, res, next) {
    try {
        const jobId = req.params.jobId;
        const foundJob = await controller.getByJobId(jobId);

        if (!foundJob) {
            return res.status(404).json({ message: 'Job ID not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Successfully! Get Job by jobId.',
            data: foundJob
        });

    } catch (error) {
        console.error(error);
        if (error instanceof ErrorHandler) {
            return next(error);
        }

        console.error(error);
        return next(new ErrorHandler('Internal Server Error - Request Failed', 500));
    }
})

// Endpoint to get job details for a user (protected with isAuth middleware)
app.get("/", isAuth, async function (req, res, next) {
    try {
        const userId = req.user._id;

        const result = await controller.getJobsByUserId(userId);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Successfully! Job details retrieved.',
            data: result
        });
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return next(error);
        }

        console.error(error);
        return next(new ErrorHandler('Internal Server Error - Request Failed', 500));
    }
});

// Endpoint to delete an invoice by its ID (protected with isAuth middleware)
app.delete("/:jobId", isAuth, async function (req, res, next) {
    try {
        const jobId = req.params.jobId;

        const result = await controller.deleteJob(jobId);

        if (!result) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Successfully! Job deleted.',
            data: result
        });
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return next(error);
        }

        console.error(error);
        return next(new ErrorHandler('Internal Server Error - Request Failed', 500));
    }
});


module.exports = app;