const mongoose = require("mongoose");
const Application = require("../models/Application.js");
const Job = require("../models/Job.js");

const applyJob = async (req, res) => {
    try {

        const userId = req.user.id;
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const existingApplication = await Application.findOne({
            user: userId,
            job: jobId
        });

        if (existingApplication) {
            return res.status(409).json({
                message: "Already applied for this job"
            })
        }

        const application = new Application({
            user: userId,
            job: jobId
        });

        await application.save();

        return res.status(201).json({
            message: "Successfully apllied"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getMyApplications = async (req, res) => {

    try {
        const userId = req.user.id;

        const applications = await Application.find({
            user: userId
        })
            .populate("job", "title company location salary role")
            .sort({ appliedAt: -1 })

        return res.status(200).json({
            applications
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getJobApplications = async (req, res) => {

    try {
        const jobId = req.params.jobId;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid Job ID"
            })
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "Your are not allowed to view applicant"
            })
        }

        const applicants = await Application.find({
            job: jobId
        })
            .populate("user", "name email")
            .sort({ appliedAt: -1 });


        return res.status(200).json({
            applicants
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const allowedStatuses = ["Applied", "Shortlisted", "Rejected", "Selected"];


const updateApplicationStatus = async (req, res) => {

    try {

        const applicationId = req.params.applicationId;

        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({
                message: "Invalid Application ID"
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            })
        }
        // const { status } = req.body;
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }

        const job = await Job.findById(application.job);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this application"
            })
        }

        application.status = status;
        await application.save();

        //await Application.findByIdAndUpdate(applicationId, {status}, {new: true});

        return res.status(200).json({
            message: "Updated status successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { applyJob, getMyApplications, getJobApplications, updateApplicationStatus };