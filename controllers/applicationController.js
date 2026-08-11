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

module.export = { applyJob };