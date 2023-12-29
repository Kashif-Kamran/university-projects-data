const repository = require('./jobTrackingRepository');
const ErrorHandler = require('../../utils/errorHandler');

// Function to add a new job
async function addJob(jobData) {
    try {
        const result = await repository.addJob(jobData);
        return result;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler('An error occurred while adding the job', 500);
    }
}

// Function to update an existing job
async function updateJob(jobId, updatedJobData) {
    try {
        const result = await repository.updateJob(jobId, updatedJobData);
        return result;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        // Handle other errors here if needed
        throw new ErrorHandler('An error occurred while updating the job', 500);
    }
}

// Function to retrieve single job by its ID
async function getByJobId(jobId) {
    try {
        const foundJob = await repository.getByJobId(jobId);
        return foundJob;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        // Handle other errors here if needed
        throw new ErrorHandler('An error occurred while updating the job', 500);
    }
}

// Function to get jobs of logged-in user
async function getJobsByUserId(jobId) {
    try {
        const jobs = await repository.getJobsByUserId(jobId);
        return jobs;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        // Handle other errors here if needed
        throw new ErrorHandler('An error occurred while getting jobs', 500);
    }
}

// Function to delete job by jobId
async function deleteJob(jobId) {
    try {
        const deleteJob = await repository.deleteJob(jobId);
        return deleteJob;
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        // Handle other errors here if needed
        throw new ErrorHandler('An error occurred while getting jobs', 500);
    }
}

module.exports = {
    addJob,
    updateJob,
    getByJobId,
    getJobsByUserId,
    deleteJob,
};

