const mongoose = require("mongoose");


const applicationSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },

    status: {
        type: String,
        enum: ["Applied", "Shortlisted", "Rejected", "Selected"],
        default: "Applied"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

applicationSchema.index(
    { user: 1, job: 1 },
    { unique: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;