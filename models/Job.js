const mongoose = require("mongoose");
//const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        // type: String,
        min: { type: Number },
        max: { type: Number },
        currency: {
            type: String,
            default: "INR"
        }
    },
    role: {
        type: String,
        required: true,
    },
    skills: [{
        type: String
    }],
    eligibility: {
        type: String,

    },
    applyLink: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;