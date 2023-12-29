const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model
    required: true
  },
  Date: Date,
  Time: String,
  Location: String,
  Longitude: Number,
  Latitude: Number,
  Description: String
});

// Create a model using the job tracking schema
const Job = mongoose.model('Job', jobSchema);

// Export the job model
module.exports = Job;