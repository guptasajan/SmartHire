const Application = require("../models/Application");
const Job = require("../models/Job");

const getDashboard = async (req, res) => {
    try {

        const [totalJobs, totalApplications, selectedCandidates, rejectedCandidates] = await Promise.all([
            Job.countDocuments(),
            Application.countDocuments(),
            Application.countDocuments({
                status: "Selected"
            }),
            Application.countDocuments({
                status: "Rejected"
            })
        ]);

        return res.status(200).json({
            totalJobs, totalApplications, selectedCandidates, rejectedCandidates
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { getDashboard }