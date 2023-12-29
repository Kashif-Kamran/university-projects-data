const Job = require('./jobTrackingSchema');
const ErrorHandler = require('../../utils/errorHandler');

// Function to add a new job
async function addJob( job) {
    try {
        const newJob = new Job({ 
            ...job,
        });
        const savedJob = await newJob.save();
        return savedJob;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Internal Server Error - Request Failed', 500);
    }
}

// Function to update an existing job
async function updateJob( jobId, updatedJobData) {
    try {
        const updatedJob = await Job.findByIdAndUpdate( jobId, updatedJobData, { new: true });
        
        if (!updatedJob) {
            throw new ErrorHandler('Job Not Found', 404);
        }
        
        return updatedJob;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Internal Server Error - Request Failed', 500);
    }
}

// Function to retrieve single job by its Id
async function getByJobId(jobId) {
    try {
        const foundJob = await Job.findOne({ _id: jobId });
        return foundJob;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Internal Server Error - Request Failed', 500);
    }
}

// Function to get jobs of logged-in user
async function getJobsByUserId(userId) {
    try {
        const userJobs = await Job.find({  UserId: userId });
        return userJobs;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Internal Server Error - Request Failed', 500);
    }
}

// Function to delete job by jobId
async function deleteJob(jobId) {
    try {
        const deleteJobs = await Job.findByIdAndDelete(jobId);
        return deleteJobs;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('Internal Server Error - Request Failed', 500);
    }
}

module.exports = {
    addJob,
    updateJob,
    getByJobId,
    getJobsByUserId,
    deleteJob,
};
