const mongoose = require("mongoose");
const Job = require("../models/Job.js");
const User = require("../models/User.js")


const createJob = async (req, res) => {
    try {


        const { title, company, location, salary, role, skills,
            eligibility, applyLink, description } = req.body;

        //validation
        if (!title || !title.trim() || !company.trim() || !location.trim() || !role.trim() || !applyLink.trim()) {
            return res.status(400).json({
                message: "All required fields are required"
            });
        }
        //create job
        const job = new Job({
            title, company, location, salary, role, skills,
            eligibility, applyLink, description,
            createdBy: req.user.id
        });
        //save job
        await job.save();
        //response
        return res.status(201).json({
            message: "Job created successfully",
            job
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,

        });
    }
};


const getAllJobs = async (req, res) => {
    try {

        const { search, company, location, role, skill, sortBy, minSalary, maxSalary } = req.query;

        //filter
        // =========================
        // FILTER
        // =========================
        const filter = {};
        //SEARCH
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { role: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }
        //Exact filters
        if (company) {
            filter.company = company;
        }
        if (location) {
            filter.location = location;
        }
        if (role) {
            filter.role = role;
        }
        if (skill) {
            filter.skills = skill;
        }

        //SALARY FILTERs
        if (minSalary) {
            const min = Number(minSalary);

            if (!Number.isFinite(min) || min < 0) {
                return res.status(400).json({
                    message: "Invalid minimum salary"
                });
            }

            filter["salary.max"] = {
                $gte: min
            };
        }
        if (maxSalary) {
            const max = Number(maxSalary);

            if (!Number.isFinite(max) || max < 0) {
                return res.status(400).json({
                    message: "Invalid maximum salary"
                });
            }

            filter["salary.min"] = {
                $lte: max
            };
        }

        if (minSalary && maxSalary) {
            if (Number(minSalary) > Number(maxSalary)) {
                return res.status(400).json({
                    message: "Minimum salary cannot be greater than maximum salary"
                });
            }
        }

        // =========================
        // SORT
        // =========================
        const sort = {};
        const allowedSorts = ["latest", "oldest", "salaryLow", "salaryHigh"];

        if (sortBy && !allowedSorts.includes(sortBy)) {
            return res.status(400).json({
                message: "Invalid sort option"
            });
        }

        if (sortBy === "oldest") {
            sort.createdAt = 1;
        }
        else if (sortBy === "salaryLow") {
            sort["salary.min"] = 1;
        }
        else if (sortBy === "salaryHigh") {
            sort["salary.max"] = -1;
        }
        else {
            sort.createdAt = -1;
        }


        //--> PAGINATION <--
        // =========================
        // PAGINATION
        // =========================
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        // const page = Number(req.query.page) || 1;
        // const limit = Number(req.query.limit) || 10;

        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({
                message: "Invalid pagination parameters"
            });
        }

        if (!Number.isInteger(page) || !Number.isInteger(limit)) {
            return res.status(400).json({
                message: "Page and limit must be numbers"
            });
        }

        const skip = (page - 1) * limit;


        // =========================
        // DATABASE QUERY
        // =========================
        const [totalJobs, jobs] = await Promise.all([
            Job.countDocuments(filter),
            Job.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
        ]);

        // const totalJobs = await Job.countDocuments();

        // const jobs = await Job.find()
        //     .sort({ createdAt: -1 })
        //     .skip(skip)
        //     .limit(limit);

        const totalPages = Math.ceil(totalJobs / limit);

        return res.status(200).json({
            totalJobs,
            totalPages,
            currentPage: page,
            jobs
        });

    }

    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


// const getAllJobs = async (req, res) => {
//     try {
//         const jobs = (await Job.find()).toSorted({ createdAt: -1 });

//         return res.status(200).json({
//             count: jobs.length,
//             jobs,
//         })
//     }

//     catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// };


const getJobById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Job ID"
            });
        }

        const job = await Job.findById(id)
            .populate("createdBy", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not Exist",
            })
        }

        return res.status(200).json({
            job,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateJob = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Job ID"
            });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update thi job"
            })
        }

        const { title, company, location, salary, role, skills,
            eligibility, applyLink, description } = req.body;

        const update = {};

        if (title !== undefined) {
            update.title = title;
        }
        if (company) {
            update.company = company;
        }
        if (location) {
            update.location = location;
        }
        if (salary) {
            update.salary = salary;
        }
        if (role) {
            update.role = role;
        }
        if (skills) {
            update.skills = skills;
        }
        if (eligibility) {
            update.eligibility = eligibility;
        }
        if (applyLink) {
            update.applyLink = applyLink;
        }
        if (description) {
            update.description = description;
        }

        const updateJob = await Job.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        return res.status(200).json({
            message: "Job updated successfully",
            job: updateJob
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const deleteJob = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Job ID"
            });
        }
        const deletedJob = await Job.findById(id);
        if (!deletedJob) {
            return res.status(404).json({
                message: "Job not found"
            })
        }
        if (deletedJob.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to delete this job"
            });
        }

        await Job.findByIdAndDelete(id);
        // const deletedJob = await Job.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Deleted Job Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getRecommendedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.json(404).json({
                message: "User not found"
            });
        }

        const userSkills = (user.skills || []).map(skill => skill.toLowerCase().trim());

        const jobs = await Job.find();

        const recommendedJobs = jobs.map(job => {

            const jobSkills = (job.skills || []).map(skill => skill.toLowerCase(skill));

            const matchingSkills = jobSkills.filter(skill => userSkills.includes(skill));

            const matchPercentage = jobSkills.length > 0
                ? Math.round(
                    (matchingSkills.length / jobSkills.length) * 100
                ) : 0;

            return { job, matchingSkills, matchPercentage };
        });

        recommendedJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

        return res.status(200).json({
            jobs: recommendedJobs
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob, getRecommendedJobs };