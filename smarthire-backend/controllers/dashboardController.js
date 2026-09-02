const Application = require("../models/Application");
const Job = require("../models/Job");

const getDashboard = async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments();

        const totalApplications =
            await Application.countDocuments();

        const shortlistedCandidates =
            await Application.countDocuments({
                status: "Shortlisted"
            });

        const selectedCandidates =
            await Application.countDocuments({
                status: "Selected"
            });

        const rejectedCandidates =
            await Application.countDocuments({
                status: "Rejected"
            });

        res.status(200).json({
            totalJobs,
            totalApplications,
            shortlistedCandidates,
            selectedCandidates,
            rejectedCandidates
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard data"
        });
    }
};

module.exports = {
    getDashboard
};

// const Application = require("../models/Application");
// const Job = require("../models/Job");

// const getDashboard = async (req, res) => {
//     try {

//         const [totalJobs, totalApplications, selectedCandidates, rejectedCandidates] = await Promise.all([
//             Job.countDocuments(),
//             Application.countDocuments(),
//             Application.countDocuments({
//                 status: "Selected"
//             }),
//             Application.countDocuments({
//                 status: "Rejected"
//             })
//         ]);

//         return res.status(200).json({
//             totalJobs, totalApplications, selectedCandidates, rejectedCandidates
//         });


//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// };

// module.exports = { getDashboard }