// Assuming you have Mongoose installed and required in your backend project
const mongoose = require('mongoose');

// Define the schema for the task model
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    completionDate: {
        type: Date,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

// Create the task model based on the schema
const Task = mongoose.model('Task',taskSchema);

// Export the task model
module.exports = Task;
